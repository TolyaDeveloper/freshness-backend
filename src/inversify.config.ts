import { Container, ContainerModule, interfaces } from 'inversify'
import { TYPES } from './types'
import { App } from './app'
import { Database } from './database/database.service'

const bindings = new ContainerModule((bind: interfaces.Bind) => {
  bind<App>(TYPES.App).to(App)
  bind<Database>(TYPES.Database).to(Database)
})

const container = new Container()

container.load(bindings)

export { container }
