import { SubscriptionPlan } from '@prisma/client'
import {
  MAX_FREE_WALLETS,
  MAX_HOBBY_WALLETS,
  MAX_PRO_WALLETS,
  MAX_USER_GROUPS,
  MAX_WHALE_WALLETS,
} from '../../constants/pricing'
import { UserPlan } from '../../lib/user-plan'
import { UserPrisma } from '../../types/prisma-types'
import { UserGroup } from '../../types/general-interfaces'

export class GeneralMessages {
  constructor() {}

  static startMessage(user: UserPrisma): string {
    const plan = user?.userSubscription?.plan || 'FREE'

    const planWallets: { [key: string]: number } = {
      FREE: MAX_FREE_WALLETS,
      HOBBY: MAX_HOBBY_WALLETS,
      PRO: MAX_PRO_WALLETS,
      WHALE: MAX_WHALE_WALLETS,
    }

    const promText = `
🎉 <b>ОГРАНИЧЕННОЕ ПРЕДЛОЖЕНИЕ (24 часа)</b>🎉
За <b>единоразовый</b> платеж всего <b>0.1 SOL</b> отслеживайте до <b>**50 кошельков НАВСЕГДА**</b>

Не упустите эту эксклюзивную возможность ускорить отслеживание кошельков без ежемесячных подписок!
`
    const messageText = `
Бот | Трекер Кошельков

Получайте уведомления о активности любого добавленного кошелька в реальном времени!

Вы сейчас отслеживаете ${user?._count.userWallets || 0} / ${planWallets[plan]} кошельков

Нажмите кнопку Обновить, чтобы разблокировать больше слотов и сохранить отслеживаемые кошельки!

Примечание для бесплатных пользователей:
Для обеспечения стабильной работы для всех, бесплатные кошельки могут периодически удаляться. Рассмотрите возможность обновления тарифа для сохранения всех отслеживаемых кошельков!`

    return messageText
  }

  static startMessageGroup = `
🐱 Бот | Трекер Кошельков

Получайте уведомления о активности любого добавленного кошелька в реальном времени!

Для использования этого бота в группе у вас должна быть подписка <b>PRO</b> или <b>WHALE</b>

<b>Доступные команды:</b>
- /add Добавить новый кошелек
- /delete Удалить кошелек
- /manage Просмотреть все кошельки
`

  static planUpgradedMessage(plan: SubscriptionPlan, subscriptionEnd: string): string {
    const planWallets: { [key: string]: number } = {
      HOBBY: MAX_HOBBY_WALLETS,
      PRO: MAX_PRO_WALLETS,
      WHALE: MAX_WHALE_WALLETS,
    }

    const planWallet = planWallets[plan]

    const messageText = `
😸 Успешно! Ваш тариф обновлен до <b>${plan}</b>.
Ваша подписка будет продлена ${subscriptionEnd}

Теперь вы можете отслеживать до <b>${planWallet}</b> кошельков одновременно!
`

    return messageText
  }

  static insufficientBalanceMessage: string = `
😿 Упс, похоже у вас недостаточно средств для выполнения этой транзакции.

Попробуйте добавить немного <b>SOL</b> на ваш личный кошелек бота 😺
`

  static userAlreadyPaidMessage(action: 'CODE' | 'PLAN'): string {
    const messageText = `
🤝 Вы уже приобрели этот ${action.toLowerCase() === 'code' ? 'код' : 'тариф'}
`

    return messageText
  }

  static walletLimitMessageError(walletName: string | undefined, walletAddress: string, planWallets: number): string {
    const messageText = `
😾 Не удалось добавить кошелек: <code>${walletName ? walletName : walletAddress}</code>,

Достигнут лимит кошельков: <b>${planWallets}</b>

Попробуйте обновить ваш <b>тариф</b> для получения большего количества кошельков 💎
`

    return messageText
  }

  static generalMessageError: string = `
😿 Упс, похоже что-то пошло не так при обработке транзакции.

Вероятно, у вас недостаточно средств на кошельке или их не хватает для покрытия комиссии за транзакцию.

Попробуйте добавить немного <b>SOL</b> на ваш личный кошелек бота 😺
`

  static botWalletError: string = `
😿 Упс! Похоже, этот кошелек отправляет слишком много tps. Пожалуйста, введите другой кошелек или попробуйте позже.
`

  static groupsMessage(userGroups: UserGroup[]) {
    const groupsContent =
      userGroups.length === 0
        ? `
<i>У вас пока нет групп.</i>
`
        : userGroups
            .map(
              (group, i) => `
✅ Название группы: <b>${group.name}</b>
🔗 ID группы: <code>${group.id}</code>

`,
            )
            .join('\n\n')

    const messageText = `
Теперь вы можете использовать <b>Бота</b> в любом групповом чате!

Ваши группы: (${userGroups.length} / ${MAX_USER_GROUPS})
${groupsContent}
Узнайте как добавить <b>Бота</b> в групповой чат в меню <b>Помощь</b>
`
    return messageText
  }

  static groupChatNotStarted = `
🚫 Вы не можете изменять настройки бота в этой группе

Бот не инициализирован. Отправьте /start
`

  static groupChatNotActivated = `
🚫 Вы не можете изменять настройки бота в этой группе

Бот не активирован. Отправьте /activate
`

  static userNotAuthorizedInGroup = `
🚫 Вы не можете изменять настройки бота в этой группе

У вас нет прав для выполнения этого действия.
`

  static deleteGroupMessage = `
Чтобы <b>удалить</b> группу из вашего списка, просто отправьте мне <u>ID группы</u>, которую вы хотите удалить.
`

  static groupDeletedMessage = `
Эта группа была удалена из вашего списка!
`
  static failedToDeleteGroupMessage = `
Не удалось удалить группу, убедитесь что вы указали правильный <b>ID группы</b>
`
}
