import { User } from '@prisma/client'
import { UserBalances } from '../../lib/user-balances'

export class WalletMessages {
  private userBalances: UserBalances
  constructor() {
    this.userBalances = new UserBalances()
  }

  static addWalletMessage: string = `
🐱 Хорошо, просто отправьте мне адрес кошелька для отслеживания:

Вы также можете дать кошельку имя, добавив после адреса желаемое имя, или добавить несколько кошельков сразу, отправив их по одному на новой строке, например:

адресКошелька1 имяКошелька1
адресКошелька2 имяКошелька2
`

  static deleteWalletMessage: string = `
Отправьте мне адрес кошелька, который хотите удалить 🗑️

Вы также можете удалить несколько кошельков сразу, если отправите их по одному на новой строке, например:

адресКошелька1
адресКошелька2
`

  public async sendMyWalletMessage(
    wallet: Pick<User, 'personalWalletPrivKey' | 'personalWalletPubKey'>,
  ): Promise<string> {
    const solBalance = await this.userBalances.userPersonalSolBalance(wallet.personalWalletPubKey)

    const responseText = `
<b>Адрес вашего кошелька:</b>
<code>${wallet && wallet.personalWalletPubKey}</code>

<b>SOL:</b> ${solBalance ? solBalance / 1e9 : 0}

`

    return responseText
  }
}
