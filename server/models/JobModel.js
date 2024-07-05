import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
   
    Status: { 
        type: String,
         required:false
         },
  companyName: {
     type: String, 
     required: false 
    },
  jobTitle: { 
    type: String, 
    required: false 
},
  Location: { 
    type: String, 
    required: false 
},
},
{timestamp:true}
)


export default mongoose.model('Job', jobSchema);