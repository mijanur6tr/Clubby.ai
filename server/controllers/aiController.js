import OpenAI from "openai";
import sql from "../config/db.js"
import { clerkClient } from "@clerk/express";

const AI = new OpenAI({
  apiKey: process.env.GEMINI_API_KEY,
  baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/",
});


//generating the articles

export const generateArticle = async (req, res) => {
  try {
    const { userId } = req.auth(); 
    const { prompt, length } = req.body;
    const plan = req.plan; 
    const free_usage = req.free_usage; 

    if (!prompt || !length) {
      return res.status(400).json({
        success: false,
        message: "Missing 'prompt' or 'length' parameters.",
      });
    }

    if (plan !== "premium" && free_usage >= 10) {
      return res.status(403).json({
        success: false,
        message: "You have exceeded the free plan limit. Upgrade your plan to continue generating content.",
      });
    }

    const response = await AI.chat.completions.create({
      model: "gemini-2.5-flash",
      messages: [
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
        message: "Content generation failed. The AI returned an empty response.",
      });
    }

    await sql`
      INSERT INTO creations(user_id, prompt, content, type) 
      VALUES(${userId}, ${prompt}, ${content}, 'article')
    `;

    if (plan !== "premium") {
      await clerkClient.users.updateUserMetadata(userId, {
        privateMetadata: {
          free_usage: free_usage + 1,
        },
      });
    }

    console.log(`Article successfully generated and saved for user ${userId}.`);
    res.status(201).json({ success: true, content });

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
// export const generateIdea = async (req, res) => {
//   try {
//     const { userId } = req.auth();
//     const { prompt ,category} = req.body;
//     const plan = req.plan;
//     const free_usage = req.free_usage;

//     if (plan !== "premium" && free_usage >= 10) {
//       return res.json({
//         success: false,
//         message: "You have used the free plan limit. Upgrade plan to use more!",
//       });
//     }

//     const response = await AI.chat.completions.create({
//       model: "gemini-2.0-flash",
//       messages: [
       
//         {
//           role: "user",
//           content: prompt,
//         },
//       ],
//       temperature: 0.7,
//       max_completion_tokens: 500,
//     });


//     const content = response.choices[0].message.content;
//     if (!content) {
        
//         console.error("AI failed to return article content.");
//         return res.json({success:false,message:"Content is not generated"})
//     }

//     await sql`INSERT INTO creations(user_id,prompt,content,type) VALUES(${userId},${prompt},${content},'idea-generation')`

//     if(plan!=="premium"){
//         await clerkClient.users.updateUserMetadata(userId,
//         {
//            privateMetadata:{
//              free_usage:free_usage+1,
//            }
//         }
//     )
//     }

//     res.json({success:true,content})

//   } catch (error) {
//     console.log("Error in generating article",error)
//     res.json({success:false,message:error.message})
//   }
// };
