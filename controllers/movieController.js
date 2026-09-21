import Movie from '../models/movie.model.js'
export const newMovie=async(req,res)=>{
    try{
        const {name,description,casts,trailerUrl,language,releaseDate,director,releaseStatus}=req.body;
        const addmovie=await Movie.create({
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
            message:"Movie Added",
            addmovie
        })
    }catch(error){
        return res.status(500).json({
            message:"Server error",
            success:false
        })
    }
}