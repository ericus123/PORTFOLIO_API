import Work from "../../model/Work";
import { uploadImage, deleteImage } from "../../helpers/images/index"

class WorkController {
    static async createWork(req,res){

  try{
    const {title,web_url,codebase_backend,codebase_front_end,image} = req.body;

    const uploaded_image = await uploadImage(image, "/Homepage/Works");
      const work = new Work({
          title: title,
          web_url: web_url,
          codebase_backend: codebase_backend,
          codebase_front_end: codebase_front_end,
          image: uploaded_image.secure_url,
          image_public_id: uploaded_image.public_id,
          createdBy: req.user.id,
          createdAt: Date.now(),
      })
      const created_work = await work.save();
      return res.status(201).json({msg:"New work created successfully", work : created_work});
  }catch(error){
       return res.status(500).json({error:"Something went wrong", err:error})
  }
 }

 static async updateWork(req,res){
    try{
        const { workId } = req.params;
        const work = await Work.findOne({_id:workId});
        if(!work){
            return res.status(404).json({error:"Work not found"})
        }
        if(req.body.image){
            const saved_image = await uploadImage(req.body.image,"/Home/Works")
            req.body.image = saved_image.secure_url;
            req.body.image_public_id = saved_image.public_id;
            await deleteImage(work.image_public_id);
        }
            work.updatedBy = req.user.id;
            work.updatedAt = Date.now();
            await work.updateOne(req.body);
        
      

     return res.status(201).json({msg:"Work updated successfully"})
    }catch(error){
      return res.status(500).json({error:"Something went wrong", err:error})
    }
    }

    static async getWork(req,res){
        try{
            const { workId } = req.params;
            const work = await Work.findOne({_id:workId});
            if(!work){
                return res.status(404).json({error:"Work not found"});
            }
            return res.status(200).json({msg:"Work fetched successfully", work: work});
        }catch(error){
            return res.status(500).json({error:"Something went wrong", err:error})
        }
    }
    static async getWorks(req,res){
        try{
            const works = await Work.find({});
            return res.status(200).json({msg:"Works fetched successfully", works: works});
        }catch(error){
            return res.status(500).json({error:"Something went wrong", err:error})
        }
    }
    static async deleteWork(req,res){
        try{
            const { workId } = req.params;
            const work = await Work.findOne({_id:workId});
            if(!work){
                return res.status(404).json({error:"Work not found"});
            }
            await deleteImage(work.image_public_id);
            await work.deleteOne();   
            return res.status(200).json({msg:"Work deleted successfully"});
        }catch(error){
            return res.status(500).json({error:"Something went wrong", err:error})
        }
    }
}

export default WorkController;