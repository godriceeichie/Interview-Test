import mongoose from 'mongoose'

const formDataSchema = new mongoose.Schema({
    name: {type: String, required: true},
    sector: {type: String, required: true},
    hasAgreed: {type: Boolean, required: true}
})

const FormDataModel = mongoose.model('FormData', formDataSchema)

export default FormDataModel