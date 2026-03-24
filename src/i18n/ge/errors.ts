import type { ErrorCode } from '@app/common/exceptions';

const translations: Record<ErrorCode, string> = {
  ORDER_CREATE_FAILED: 'ორდერი ვერ შეიქმნა',
  ORDER_NOT_FOUND: 'შეკვეთა ვერ მოიძებნა',
  WALLET_INSUFFICIENT_FUNDS: 'არასაკმარისი ბალანსი',
  WALLET_DEDUCTION_FAILED: 'ბალანსის ჩამოკლება ვერ მოხერხდა',
  WALLET_UNKNOWN: 'საფულე ვერ მოიძებნა',
  VALIDATION_FAILED: 'ვალიდაციის შეცდომა',
  KYT_CHECK_FAILED: 'KYT ვალიდაცია წარუმატებელია',
  INTERNAL_SERVER_ERROR: 'სერვერის შეცდომა',
};

export default translations;
