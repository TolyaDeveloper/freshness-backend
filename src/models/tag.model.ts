import mongoose from 'mongoose'

const tagSchema = new mongoose.Schema({
  name: { type: String },
  slug: { type: String }
})

const tagModel = mongoose.model('Tag', tagSchema)

export default tagModel
