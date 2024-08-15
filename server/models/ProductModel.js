import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    image: String,
    name: String,
    category: String,
    description: String,
    price: String
},
{timestamp:true}
)


export default mongoose.model('Product', productSchema);