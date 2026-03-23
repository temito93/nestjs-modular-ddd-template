import type { ErrorCode } from '../../common/exceptions/error-codes';

const translations: Record<ErrorCode, string> = {
  ORDER_CREATE_FAILED: 'Buyurtma yaratishda xatolik',
  ORDER_NOT_FOUND: 'Buyurtma topilmadi',
  WALLET_INSUFFICIENT_FUNDS: 'Mablag insufficient',
  WALLET_DEDUCTION_FAILED: 'Hisobdan yechib olishda xatolik',
  WALLET_UNKNOWN: 'Hamyon xizmati javob bermadi',
  VALIDATION_FAILED: 'Tekshirish xatosi',
  KYT_CHECK_FAILED: 'KYT tekshiruvi muvaffaqiyatsiz',
  INTERNAL_SERVER_ERROR: 'Server xatosi',
};

export default translations;
