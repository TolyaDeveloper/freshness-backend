export interface IMailService {
  sendActivationEmail: (to: string, link: string) => Promise<void>
}
