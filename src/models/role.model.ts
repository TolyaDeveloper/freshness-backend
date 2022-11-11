import mongoose from 'mongoose'

const roleSchema = new mongoose.Schema({
  role: { type: String, unique: true, default: 'USER' }
})

const roleModel = mongoose.model('Role', roleSchema)

type RoleModelType = mongoose.InferSchemaType<typeof roleSchema> & {
  _id: mongoose.Types.ObjectId
}

export { roleModel, RoleModelType }
