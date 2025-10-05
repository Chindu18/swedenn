import Movies from "../Models/Movies.js"

export const getMovie=async(req,res)=>{
    try {
         const response=await Movies.find();
          res.status(200).json({
            success:true,
            message:`movie data fetched success,total data is:${response.length}`,
            data:response
          })
    } catch (error) {
        res.json({
            success:false,
            message:`error is ocuured ,${error.message}`
        })
    }
}