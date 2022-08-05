import { Container, ContainerModule, interfaces } from 'inversify'
import { TYPES } from './types'
import { App } from './app'

const bindings = new ContainerModule((bind: interfaces.Bind) => {
  bind<App>(TYPES.App).to(App)
})

const container = new Container()

container.load(bindings)

export { container }
