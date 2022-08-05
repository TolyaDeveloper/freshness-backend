import 'reflect-metadata'
import { App } from './app'
import { container } from './inversify.config'
import { TYPES } from './types'

interface IBootstrapReturn {
  app: App
}

const bootstrap = async (): Promise<IBootstrapReturn> => {
  const app = container.get<App>(TYPES.App)

  app.run()

  return { app }
}

export const boot = bootstrap()
