import express, { Express } from 'express'
import { Server } from 'http'
import { injectable } from 'inversify'
import helmet from 'helmet'

@injectable()
class App {
  public port: number
  public app: Express
  public server: Server

  constructor() {
    this.port = 8000
    this.app = express()
  }

  private useMiddlewares(): void {
    this.app.use(helmet())
  }

  public async run(): Promise<void> {
    this.useMiddlewares()

    this.server = this.app.listen(this.port, () => {
      console.log(`Server is working at ${this.port} port`)
    })
  }

  public close(): void {
    this.server.close()
  }
}

export { App }
