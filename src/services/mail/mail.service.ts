import { injectable, inject } from 'inversify'
import { createTransport, Transporter } from 'nodemailer'
import { IConfigService } from '../../config/config.service.interface'
import { TYPES } from '../../types'
import { IMailService } from './interfaces/mail.service.inerface'

@injectable()
class MailService implements IMailService {
  private transporter: Transporter

  constructor(
    @inject(TYPES.ConfigService) private configService: IConfigService
  ) {
    this.transporter = createTransport({
      host: this.configService.get('MAIL_HOST'),
      port: Number(this.configService.get('MAIL_PORT')),
      secure: false,
      auth: {
        user: this.configService.get('MAIL_AUTH_USER'),
        pass: this.configService.get('MAIL_AUTH_PASS')
      }
    })
  }

  public async sendActivationEmail(to: string, link: string) {
    await this.transporter.sendMail({
      from: this.configService.get('MAIL_AUTH_USER'),
      to,
      subject: `Account activation for ${this.configService.get('SERVER_URI')}`,
      html: `<div><h1>Follow this link to activate your account on</h1><a href="${link}">${this.configService.get(
        'SERVER_URI'
      )}</a></div>`
    })
  }
}

export { MailService }
