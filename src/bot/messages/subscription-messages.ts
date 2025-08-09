import { format, formatDistanceToNow } from 'date-fns'
import { BOT_USERNAME } from '../../constants/handi-cat'
import {
  HOBBY_PLAN_FEE,
  MAX_HOBBY_WALLETS,
  MAX_PRO_WALLETS,
  MAX_USER_GROUPS,
  MAX_WHALE_WALLETS,
  PRO_PLAN_FEE,
  WHALE_PLAN_FEE,
} from '../../constants/pricing'
import { UserWithSubscriptionPlan } from '../../types/prisma-types'

export class SubscriptionMessages {
  constructor() {}

  static upgradeProMessage(user: UserWithSubscriptionPlan | null): string {
    const subscriptionExists = user?.userSubscription ? true : false

    const subscriptionPlan = subscriptionExists ? user?.userSubscription?.plan : 'FREE'

    const subscriptionEnd = user?.userSubscription?.subscriptionCurrentPeriodEnd
    const formattedDate = subscriptionEnd
      ? `${formatDistanceToNow(subscriptionEnd, { addSuffix: true })} (${format(subscriptionEnd, 'MMM d, yyyy')})`
      : 'N/A'

    const messageText = `
Текущий тариф: ${subscriptionPlan === 'FREE' ? `😿 <b>${subscriptionPlan}</b>` : `😺 <b>${subscriptionPlan}</b>`}
${subscriptionPlan !== 'FREE' ? `<b>Ваша подписка будет продлена <u>${formattedDate}</u></b>\n` : ''}
<b>Обновив до любого тарифа, вы сможете:</b>
✅ Отслеживать больше кошельков для расширения возможностей мониторинга.
✅ Предотвратить удаление кошельков.
✅ Получить доступ к <b>ПРЕМИУМ</b> функциям.

<b>Выберите ваш тариф:</b>
<b>HOBBY</b>: ${MAX_HOBBY_WALLETS} кошельков - ${HOBBY_PLAN_FEE / 1e9} <b>SOL</b> / месяц
<b>PRO</b>: ${MAX_PRO_WALLETS} кошельков - ${PRO_PLAN_FEE / 1e9} <b>SOL</b> / месяц
<b>WHALE</b>: ${MAX_WHALE_WALLETS} кошельков - ${WHALE_PLAN_FEE / 1e9} <b>SOL</b> / месяц

<b>Как обновить ваш тариф?</b>
1. Переведите необходимое количество <b>SOL</b> на ваш кошелек <b>Бота</b>: <code>${user?.personalWalletPubKey}</code>
2. Теперь вы можете выбрать один из тарифов ниже!
`

    return messageText
  }

  static groupChatNotPro = `
🚫 Вы можете добавить бота в группу только если у вас есть подписка <b>PRO</b> или <b>WHALE</b>.

Вы можете обновить ваш тариф напрямую из нашего официального бота:

@${BOT_USERNAME}
`

  static userUpgradeGroups = `
Чтобы добавить <b>Бота</b> в группы, вам нужна подписка <b>PRO</b> или <b>WHALE</b>

<b>Нажмите кнопку ниже, чтобы обновить подписку и получить доступ к нашим эксклюзивным функциям!</b>
`

  static userGroupsLimit = `
Вы достигли максимального лимита групп, которые можете добавить <b>(${MAX_USER_GROUPS}).</b>
Чтобы добавить новую группу, пожалуйста, удалите существующую.
`
}
