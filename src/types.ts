const TYPES = {
  App: Symbol.for('App'),
  Database: Symbol.for('Database'),
  LoggerService: Symbol.for('LoggerService'),
  ConfigService: Symbol.for('ConfigService'),
  ExceptionFilter: Symbol.for('ExceptionFilter'),
  AuthController: Symbol.for('AuthController'),
  AuthRepository: Symbol.for('AuthRepository'),
  AuthService: Symbol.for('AuthService'),
  ShopController: Symbol.for('ShopController'),
  ShopRepository: Symbol.for('ShopRepository'),
  ShopService: Symbol.for('ShopService'),
  UserController: Symbol.for('UserController'),
  UserRepository: Symbol.for('UserRepository'),
  UserService: Symbol.for('UserService'),
  TokenService: Symbol.for('TokenService'),
  TokenRepository: Symbol.for('TokenRepository'),
  MailService: Symbol.for('MailService')
}

export { TYPES }
