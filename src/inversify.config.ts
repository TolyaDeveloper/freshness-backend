import { Container, ContainerModule, interfaces } from 'inversify'
import { TYPES } from './types'
import { App } from './app'
import { Database } from './database/database.service'
import { IDatabaseService } from './database/database.service.interface'
import { LoggerService } from './logger/logger.service'
import { ILoggerService } from './logger/logger.service.interface'
import { ConfigService } from './config/config.service'
import { IConfigService } from './config/config.service.interface'

const bindings = new ContainerModule((bind: interfaces.Bind) => {
  bind<App>(TYPES.App).to(App)
  bind<IDatabaseService>(TYPES.Database).to(Database)
  bind<ILoggerService>(TYPES.LoggerService).to(LoggerService).inSingletonScope()
  bind<IConfigService>(TYPES.ConfigService).to(ConfigService).inSingletonScope()
})

const container = new Container()

container.load(bindings)

export { container }
