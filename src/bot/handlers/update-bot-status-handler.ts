import TelegramBot from 'node-telegram-bot-api'
import { PrismaUserRepository } from '../../repositories/prisma/user'
import { SUB_MENU } from '../../config/bot-menus'

export class UpdateBotStatusHandler {
  private prismaUserRepository: PrismaUserRepository
  constructor(private bot: TelegramBot) {
    this.prismaUserRepository = new PrismaUserRepository()
    this.bot = bot
  }

  public async pauseResumeBot(msg: TelegramBot.Message) {
    const chatId = msg.chat.id

    const botPaused = await this.prismaUserRepository.updateUserHandiCatStatus(String(chatId))

    if (botPaused.status !== 'ok') return

    const changedStatus = botPaused.changedStatus

    const messageText = `
${
  changedStatus === 'PAUSED'
    ? `
✨ Бот был <u>приостановлен</u>, и вы больше не будете получать уведомления, пока не возобновите его!

Вы всегда можете возобновить бота в меню настроек.
`
    : changedStatus === 'ACTIVE'
      ? `
✨ Бот был <u>возобновлён</u>, и вы снова начнёте получать уведомления!

Вы можете в любой момент изменить настройки в меню настроек.
`
      : changedStatus === 'NONE'
        ? `
Что-то пошло не так при обновлении статуса, пожалуйста, попробуйте позже.
`
        : ''
}
`

    this.bot.editMessageText(messageText, {
      chat_id: chatId,
      message_id: msg.message_id,
      reply_markup: SUB_MENU,
      parse_mode: 'HTML',
    })
  }
}
