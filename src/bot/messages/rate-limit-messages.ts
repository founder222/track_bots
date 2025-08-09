export class RateLimitMessages {
  constructor() {}

  static walletWasPaused(walletAddress: string): string {
    const messageText = `
Ваш кошелек <code>${walletAddress}</code> отправляет слишком много транзакций в секунду и будет приостановлен на 2 часа
`

    return messageText
  }

  static walletWasResumed(walletAddress: string): string {
    const messageText = `
Ваш кошелек <code>${walletAddress}</code> был возобновлен после 2 часов ожидания!
        `

    return messageText
  }

  static walletWasBanned(walletAddress: string): string {
    const messageText = `
Ваш кошелек <code>${walletAddress}</code> был заблокирован и больше не отслеживается из-за чрезмерного спама транзакций
`

    return messageText
  }
}
