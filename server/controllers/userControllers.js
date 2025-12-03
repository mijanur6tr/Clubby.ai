import sql from "../config/db.js";


export const getUserCreations = async (req, res) => {
  try {
    const { userId } = await req.auth();
    const creations = await sql`SELECT * FROM creations WHERE user_id = ${userId} ORDER BY created_at DESC `

    res.status(200).json({ success: true, creations });

  } catch (error) {
    console.error("Error in generating article:", error);

    res.status(500).json({
      success: false,
      message: "Error in getting the user creation",
      error: error.message,
    });
  }
};


export const getPublicCreations = async (req, res) => {
  try {

    const creations = await sql`SELECT * FROM creations WHERE publish = true ORDER BY created_at DESC`

    res.status(200).json({ success: true, creations });

  } catch (error) {
    console.error("Error in generating article:", error);

    res.status(500).json({
      success: false,
      message: "Error in getting the user creation",
      error: error.message,
    });
  }
};

export const toggleLike = async (req,res)=>{

    const {id} = req.body;
    const { userId } = await req.auth();
    const result = await sql`SELECT * FROM creations WHERE id = ${id}`

     if(result.length === 0){
        return res.status(400).json({
        success: false,
        message:
          "Creation not found",
      });
    }

    const creations = result[0];
   
    const currentLikes = creations.likes || [];
    const strUserId = userId.toString();
    let updateLikes;
    let message;

    if(currentLikes.includes(strUserId)){
        updateLikes = currentLikes.filter((user)=>user !== strUserId);
        message = "Unliked";
    }else{
        updateLikes= [...currentLikes,strUserId];
        message = "Liked"
    }

    const updated = await sql`
        UPDATE creations
        SET likes = ${updateLikes}
        WHERE id = ${id}
        `;

    if(!updated){
        return res.status(500).json({success:false,message:"Error in updating the database"})
    }

    res.status(200).json({success:true,message});

}