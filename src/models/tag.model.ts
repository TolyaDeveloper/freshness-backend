import mongoose from 'mongoose'

interface ITagModel {
  name: string
  slug: string
}

const tagSchema = new mongoose.Schema<ITagModel>({
  name: { type: String },
  slug: { type: String }
})

const tagModel = mongoose.model<ITagModel>('Tag', tagSchema)

export { tagModel, ITagModel }
