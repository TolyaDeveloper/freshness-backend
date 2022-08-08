import mongoose from 'mongoose'

const postSchema = new mongoose.Schema({
  createdAt: { type: Date, default: Date.now },
  authorAvatarUri: { type: String },
  authorName: { type: String },
  title: { type: String },
  postImageUri: { type: String },
  tags: [
    {
      ref: 'Tag',
      type: mongoose.Schema.Types.ObjectId
    }
  ]
})

const postModel = mongoose.model('Post', postSchema)

export default postModel
