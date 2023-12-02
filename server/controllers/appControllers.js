import Sector from '../models/sectorModel.js'
import FormData from '../models/formDataModel.js'

export const getSectors = async (req, res) => {
    try{
        const sectors = await Sector.find({})
        return res.status(200).json({sectors})
    }catch(error){
        return res.status(500).json({error: error.message})
    }
}

export const postFormData = async (req, res) => {
    const { name, sector, hasAgreed } = req.body
    let emptyFields = []

    if(!name){
        emptyFields.push('name')
    }

    if(!sector){
        emptyFields.push('sector')
    }

    if(!hasAgreed){
        emptyFields.push('hasAgreed')
    }

    if(emptyFields.length > 0){
        return res.status(400).json({error: 'Please fill in all the fields', emptyFields})
    }
    try{
        const formData = await FormData.create({name, sector, hasAgreed})
        return res.status(200).json(formData)
    }catch(error){
        return res.status(400).json({ error: error.message })
    }
}

