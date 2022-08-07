import { Container, ContainerModule, interfaces } from 'inversify'
import { TYPES } from './types'
import { App } from './app'
import { Database } from './database/database.service'
import { IDatabaseService } from './database/database.service.interface'
import { LoggerService } from './logger/logger.service'
import { ILoggerService } from './logger/logger.service.interface'
import { ConfigService } from './config/config.service'
import { IConfigService } from './config/config.service.interface'
import { ExceptionFilter } from './exceptions/exception.filter'
import { IExceptionFilter } from './exceptions/exception.filter.interface'
import { CategoriesController } from './modules/categories/categories.controller'
import { ICategoriesController } from './modules/categories/interfaces/categories.controller.interface'
import { CategoriesRepository } from './modules/categories/categories.repository'
import { ICategoriesRepository } from './modules/categories/interfaces/categories.repository.interface'
import { CategoriesService } from './modules/categories/categories.service'
import { ICategoriesService } from './modules/categories/interfaces/categories.service.interface'

const bindings = new ContainerModule((bind: interfaces.Bind) => {
  bind<App>(TYPES.App).to(App)
  bind<IDatabaseService>(TYPES.Database).to(Database)
  bind<ILoggerService>(TYPES.LoggerService).to(LoggerService).inSingletonScope()
  bind<IConfigService>(TYPES.ConfigService).to(ConfigService).inSingletonScope()
  bind<IExceptionFilter>(TYPES.ExceptionFilter).to(ExceptionFilter)
  bind<ICategoriesController>(TYPES.CategoriesController).to(
    CategoriesController
  )
  bind<ICategoriesRepository>(TYPES.CategoriesRepository).to(
    CategoriesRepository
  )
  bind<ICategoriesService>(TYPES.CategoriesService).to(CategoriesService)
})

const container = new Container()

container.load(bindings)

export { container }
