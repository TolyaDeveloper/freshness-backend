class HttpError extends Error {
  constructor(public statusCode: number, message: string) {
    super(message)
  }

  static Unathorized() {
    return new Error('Not authorized!')
  }

  static Forbidden() {
    return new Error('Forbidden!')
  }

  static NotFound() {
    return new Error('Not Found!')
  }

  static ROLE_DOES_NOT_EXIST() {
    return new Error(`Role does not exist!`)
  }

  static USER_ALREADY_EXISTS(email: string) {
    return new Error(`User with email ${email} already exists!`)
  }

  static USER_DOES_NOT_EXIST(email: string) {
    return new Error(`User with email ${email} does not exist!`)
  }

  static INCORRECT_PASSWORD() {
    return new Error('Incorrect password!')
  }

  static ACCOUNT_ACTIVATION_FAILED() {
    return new Error('Failed to activate an account!')
  }

  static SESSION_DOES_NOT_EXIST() {
    return new Error('Session does not exist!')
  }
}

export { HttpError }
