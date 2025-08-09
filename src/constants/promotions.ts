import { PromotionType } from '@prisma/client'

export const GET_50_WALLETS_PROMOTION = {
  price: 0.1,
  type: PromotionType.UPGRADE_TO_50_WALLETS,
  description: 'Отслеживайте до 50 кошельков навсегда',
  isActive: true,
}
