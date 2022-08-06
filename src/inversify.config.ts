import { Container, ContainerModule, interfaces } from 'inversify'
import { TYPES } from './types'
import { App } from './app'
import { Database } from './database/database.service'
import { LoggerService } from './logger/logger.service'
import { ILoggerService } from './logger/logger.service.interface'

const bindings = new ContainerModule((bind: interfaces.Bind) => {
  bind<App>(TYPES.App).to(App)
  bind<Database>(TYPES.Database).to(Database)
  bind<ILoggerService>(TYPES.LoggerService).to(LoggerService)
})

const container = new Container()

container.load(bindings)

export { container }
