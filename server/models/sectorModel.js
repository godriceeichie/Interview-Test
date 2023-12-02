import mongoose from "mongoose";

const sectorSchema = new mongoose.Schema({
    sector: {type: String, required: true}
})

const SectorModel =  mongoose.model('Sector', sectorSchema)

export default SectorModel