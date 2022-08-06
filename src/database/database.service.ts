import { injectable } from 'inversify'
import mongoose from 'mongoose'

@injectable()
class Database {
  public async connect(): Promise<void> {
    try {
      await mongoose.connect('mongodb://localhost:27017/freshness')

      console.log('Connected to the database!')
    } catch (err) {
      if (err instanceof Error) {
        console.error(err.message)
      }
    }
  }

  public async disconnect(): Promise<void> {
    try {
      await mongoose.disconnect()

      console.log('Disconnected from the database!')
    } catch (err) {
      if (err instanceof Error) {
        console.error(err.message)
      }
    }
  }
}

export { Database }
