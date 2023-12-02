import Sector from '../models/sectorModel.js'

export const getSectors = async (req, res) => {
    try{
        const sectors = await Sector.find({})
        return res.status(200).json({sectors})
    }catch(error){
        return res.status(500).json({error: error.message})
    }
}

