import {Request,Response} from 'express'

export const postCat= (req:Request,res:Response)=>{
    try {
        const {cat}=req.body

        //set cat to db
        res.json({
            sucess:true,
            cat:cat,
            msg:"catgory fetched successfully"
        })
    } catch (error) {
        console.log(error)
        res.json({
            success:true,
            error:error,
            msg:"Internal Server error"
        })
    }
    
}