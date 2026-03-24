import type { ErrorCode } from '@app/common/exceptions';

const translations: Record<ErrorCode, string> = {
  ORDER_CREATE_FAILED: 'Sipariş oluşturulamadı',
  ORDER_NOT_FOUND: 'Sipariş bulunamadı',
  WALLET_INSUFFICIENT_FUNDS: 'Yetersiz bakiye',
  WALLET_DEDUCTION_FAILED: 'Bakiye düşülemedi',
  WALLET_UNKNOWN: 'Cüzdan servisi yanıt vermedi',
  VALIDATION_FAILED: 'Doğrulama hatası',
  KYT_CHECK_FAILED: 'KYT doğrulaması başarısız',
  INTERNAL_SERVER_ERROR: 'Sunucu hatası',
};

export default translations;
