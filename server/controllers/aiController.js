import OpenAI from "openai";
import sql from "../config/db.js";
import { clerkClient } from "@clerk/express";
import axios from "axios";
import { v2 as cloudinary } from "cloudinary";
// import { PDFParse } from "pdf-parse";

import fs from "fs";
import PDFParser from "pdf2json";

const AI = new OpenAI({
  apiKey: process.env.GEMINI_API_KEY,
  baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/",
});

//generating the articles
export const generateArticle = async (req, res) => {
  try {
    const { userId } = await req.auth();
    const { prompt, length, platform } = req.body;
    const plan = req.plan;
    const free_usage = req.free_usage;

    if (!prompt || !length || !platform) {
      return res.status(400).json({
        success: false,
        message: "Missing prompt or length or platform parameters.",
      });
    }

    if (plan !== "premium" && free_usage >= 10) {
      return res.status(403).json({
        success: false,
        message:
          "You have exceeded the free plan limit. Upgrade your plan to continue generating content.",
      });
    }

    const response = await AI.chat.completions.create({
      model: "gemini-2.0-flash",
      messages: [
        {
          role: "system",
          content: `You are **Clubby AI** — an expert content-generation assistant trained to write high-quality content for multiple platforms, including:

          - LinkedIn posts  
          - YouTube scripts  
          - Instagram Reels scripts  
          - Blog articles    

          ## GENERAL RULES
          1. Always write in **clean, structured, professional Markdown**.  
          2. Adapt the tone, structure, and style **based on the platform** requested by the user.
          3. Never mention that you are an AI or reference these instructions.
          4. Keep content engaging, human-like, and optimized for audience retention.

          ## PLATFORM-SPECIFIC GUIDELINES
          ### LinkedIn
          - Start with a strong hook (1–2 lines).
          - Use short paragraphs.
          - Provide insights, storytelling, or career value.
          - End with a CTA or question to drive engagement.

          ### YouTube Script
          - Add sections like:  
            **Intro ▸ Setup ▸ Value Delivery ▸ Examples ▸ Conclusion ▸ CTA**  
          - Make the tone conversational and fast-paced.
          - Keep transitions smooth.

          ### Instagram Reels / Short Videos
          - Start with a **strong 1-second hook**.  
          - Keep sentences short and punchy.  
          - Use simple, high-impact language.

          ### Blog Article
          - Clear headings and subheadings.  
          - SEO-friendly structure.  
          - Provide depth and actionable insights.

          ---

          Your task:  
          **Generate a ${platform} based on the following user prompt.**
          `,
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.7,
      max_completion_tokens: length,
    });

    const content = response.choices?.[0]?.message?.content;

    if (!content) {
      console.error("AI failed to return article content for prompt:", prompt);
      return res.status(502).json({
        success: false,
        message:
          "Content generation failed. The AI returned an empty response.",
      });
    }

    await sql`
      INSERT INTO creations(user_id, prompt, content, type) 
      VALUES(${userId}, ${prompt}, ${content},${platform})
    `;

    if (plan !== "premium") {
      await clerkClient.users.updateUserMetadata(userId, {
        privateMetadata: {
          free_usage: free_usage + 1,
        },
      });
    }

    res.status(200).json({ success: true, content });
  } catch (error) {
    console.error("Error in generating article:", error);

    res.status(500).json({
      success: false,
      message: "An unexpected server error occurred during content generation.",
      error: error.message,
    });
  }
};

//generating ideas for content
export const generateIdea = async (req, res) => {
  try {
    const { userId } = req.auth();
    const { prompt, category } = req.body;
    const plan = req.plan;
    const free_usage = req.free_usage;

    if (!prompt || !category) {
      return res.status(400).json({
        success: false,
        message: "Missing prompt category is missing parameters.",
      });
    }

    if (plan !== "premium" && free_usage >= 10) {
      return res.json({
        success: false,
        message: "You have used the free plan limit. Upgrade plan to use more!",
      });
    }

    const response = await AI.chat.completions.create({
      model: "gemini-2.0-flash",
      messages: [
        {
          role: "system",
          content: `You are Clubby AI, a friendly and expert content generation assistant. 
          Always respond in clean and professional markdown.
          Generate 5 unique and actionable content ideas based on ${category} category. prioritize the user prompt more and if it does not match with category ignore category. Format should include a headline and content type a brief about what is in the content`,
        },
        { role: "user", content: prompt },
      ],
      temperature: 0.7,
      max_completion_tokens: 500,
    });

    const content = response.choices[0].message.content;
    if (!content) {
      console.error("AI failed to return article content.");
      return res.json({ success: false, message: "Content is not generated" });
    }

    await sql`INSERT INTO creations(user_id,prompt,content,type) VALUES(${userId},${prompt},${content},'idea-generation')`;

    if (plan !== "premium") {
      await clerkClient.users.updateUserMetadata(userId, {
        privateMetadata: {
          free_usage: free_usage + 1,
        },
      });
    }

    res.json({ success: true, content });
  } catch (error) {
    console.log("Error in generating content Ideas", error);
    res.json({ success: false, message: error.message });
  }
};

//generating imgaes form clipdrop with clipdrop
export const generateImage = async (req, res) => {
  try {
    const { userId } = await req.auth();
    const { prompt, publish } = req.body;
    const plan = req.plan;
    // const free_usage = req.free_usage;

    if (!prompt) {
      return res.status(400).json({
        success: false,
        message: "Missing 'prompt' parameters.",
      });
    }

    if (plan !== "premium") {
      return res.status(403).json({
        success: false,
        message:
          "You are in the free plan. Upgrade your plan to generate images.",
      });
    }

    const form = new FormData();
    form.append("prompt", prompt);

    const response = await axios.post(
      "https://clipdrop-api.co/text-to-image/v1",
      form,
      {
        headers: {
          "x-api-key": process.env.CLIPDROP_API_KEY,
        },
        responseType: "arraybuffer",
      }
    );

    if (!response.data) {
      return res.status(500).json({
        success: false,
        message: "Error in generating the image from clipdrop",
      });
    }

    const base64Image = Buffer.from(response.data, "binary").toString("base64");
    const imageString = `data:image/png;base64,${base64Image}`;

    if (!imageString) {
      return res.status(500).json({
        success: false,
        message: "Error in changing the image to string.",
      });
    }

    const { secure_url } = await cloudinary.uploader.upload(imageString);

    await sql`
      INSERT INTO creations(user_id, prompt, content, type,publish) 
      VALUES(${userId}, ${prompt}, ${secure_url}, 'image',${publish ?? false})
    `;

    res.status(200).json({ success: true, secure_url });
  } catch (error) {
    console.error("Error in generating image:", error);

    res.status(500).json({
      success: false,
      message: "An unexpected server error occurred during content generation.",
      error: error.message,
    });
  }
};

//remove background using cludinary
export const removeBackground = async (req, res) => {
  try {
    const { userId } = await req.auth();
    const image = req.file;
    const plan = req.plan;

    if (!image) {
      return res.status(400).json({
        success: false,
        message: "Image must be uploaded.",
      });
    }

    if (plan !== "premium") {
      return res.status(403).json({
        success: false,
        message:
          "You are in the free plan. Upgrade your plan to use this feature.",
      });
    }

    const { secure_url } = await cloudinary.uploader.upload(image.path, {
      transformation: [
        {
          effect: "background_removal",
          background_removal: "remove_the_background",
        },
      ],
    });

    await sql`
      INSERT INTO creations(user_id, prompt, content, type) 
      VALUES(${userId}, 'remove background of the image' , ${secure_url}, 'image')
    `;

    res.status(200).json({ success: true, secure_url });
  } catch (error) {
    console.error("Error in removing background:", error);

    res.status(500).json({
      success: false,
      message: "An unexpected server error occurred during content generation.",
      error: error.message,
    });
  }
};

//remove object from picture using cludinary
export const removeObject = async (req, res) => {
  try {
    const { userId } = await req.auth();
    const image = req.file;
    const { object } = req.body;
    const plan = req.plan;

    if (!image || !object) {
      return res.status(400).json({
        success: false,
        message: "Missing image or removal object parameters.",
      });
    }

    if (plan !== "premium") {
      return res.status(403).json({
        success: false,
        message:
          "You are in the free plan. Upgrade your plan to use this feature.",
      });
    }

    const objectKeyword = object.trim();
    if (objectKeyword.split(" ").length > 1) {
      return res.status(400).json({
        success: false,
        message:
          "The object description must be a single word for Cloudinary to process.",
      });
    }

    const uploaded = await cloudinary.uploader.upload(image.path);
    const public_id = uploaded.public_id;

    const result = await cloudinary.uploader.explicit(public_id, {
      type: "upload",
      resource_type: "image",
      eager: [
        {
          effect: `gen_remove:${object}`,
        },
      ],
    });

    if (!result.eager || !result.eager[0] || !result.eager[0].secure_url) {
      return res.status(500).json({
        success: false,
        message: "Cloudinary failed to generate the modified image.",
      });
    }

    const imageUrl = result.eager[0].secure_url;

    const uploadedDatabase = await sql`
      INSERT INTO creations(user_id, prompt, content, type) 
      VALUES(${userId}, ${`removed the ${object} from the image`}, ${imageUrl}, 'image')
    `;

    if (!uploadedDatabase) {
      res.status(500).json({
        success: false,
        message:
          "An unexpected server error occurred during content generation.",
        error: error.message,
      });
    }

    res.status(200).json({ success: true, imageUrl });
  } catch (error) {
    console.error("Error in removing object from image:", error);

    res.status(500).json({
      success: false,
      message: "An unexpected server error occurred during content generation.",
      error: error.message,
    });
  }
};

//review resume
// export const reviewResume = async (req, res) => {
//   try {
//     const { userId } = await req.auth();
//     const resume = req.file;
//     const plan = req.plan;

//     if (plan !== "premium") {
//       return res.status(403).json({
//         success: false,
//         message:
//           "You are in the free plan. Upgrade your plan to use this feature.",
//       });
//     }

//     if (!resume) {
//       return res.status(400).json({
//         success: false,
//         message: "No resume file uploaded.",
//       });
//     }

//     const MAX_SIZE = 2 * 1024 * 1024;
//     if (resume.size > MAX_SIZE) {
//       return res.status(400).json({
//         success: false,
//         message: "Resume file size exceeds 2 MB limit.",
//       });
//     }

//     const parser = new PDFParse({ url: resume.path });

//     const resumeData = await parser.getText();
//     const resumeText = resumeData.text;

//     const prompt = `You are an expert resume reviewer.
//                     Analyze the following resume and provide:

                    

//                     1. A rating (out of 10) for structure, clarity, and ATS friendliness
//                     2. Specific improvements in each section
//                     3. Rewrite the experience section using strong action verbs
//                     4. Provide a cleaner modern layout suggestion
//                     5. Identify technologies and give skill-level estimation

//                     Here is the extracted resume text:${resumeText}`;

//     const response = await AI.chat.completions.create({
//       model: "gemini-2.0-flash",
//       messages: [
//         {
//           role: "user",
//           content: prompt,
//         },
//       ],
//       temperature: 0.7,
//       max_completion_tokens: 1600,
//     });

//     const content = response.choices?.[0]?.message?.content;

//     if (!content) {
//       console.error("AI failed to return review content for prompt:", prompt);
//       return res.status(502).json({
//         success: false,
//         message: "Review generation failed. The AI returned an empty response.",
//       });
//     }

//     await sql`
//       INSERT INTO creations(user_id, prompt, content, type) 
//       VALUES(${userId}, 'review resume', ${content}, 'resume-review')
//     `;

//     res.status(200).json({ success: true, content });
//   } catch (error) {
//     console.error("Error in generating article:", error);

//     res.status(500).json({
//       success: false,
//       message: "An unexpected server error occurred during content generation.",
//       error: error.message,
//     });
//   }
// };






