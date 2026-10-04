import Movie from '../models/movie.model.js'

export const newMovie=async(req,res)=>{
    try{
        const {name,description,casts,trailerUrl,language,releaseDate,director,releaseStatus}=req.body;
        if(!name || !description ||!casts || !trailerUrl ||!language ||!releaseDate || !director || !releaseDate){
            return res.status(400).json({
                success:false,
                message:"All Fields are requireds"
            })
        }
        const existMovie=await Movie.findOne({name});
        if (existMovie) {
      return res.status(409).json({
        success: false,
        message: "Movie already exists",
      });
    }
        const addMovie=await Movie.create({
            name,
            description,
            casts,
            trailerUrl,
            language,
            releaseDate,
            director,
            releaseStatus
        });
        return res.status(200).json({
            success:true,
            message:"Movie Added",
            addMovie
        })
    }catch(error){
        return res.status(500).json({
            message:"Server error",
            success:false
        })
    }
}
export const getMovie=async(req,res)=>{
    try{
        const allmovie=await Movie.find();
        if(allmovie.length === 0){
            return res.status(400).json({
                success:false,
                message:"Movie Not Found.."
            })
        }
        return res.status(200).json({
            success:true,
            message:"All Movies",
            allmovie
        })
    }catch(error){
        return res.status(500).json({
            success:false,
            message:"Internal Server Error"
        })
    }
}