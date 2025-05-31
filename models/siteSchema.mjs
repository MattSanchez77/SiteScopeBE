import mongoose from "mongoose";

const siteSchema = new mongoose.Schema({
    name: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zip: { type: Number, required: true },
    type: { type: String, required: true },
})

export default mongoose.model("Site", siteSchema)