export interface ErrorDefinition {
  statusCode: number;
  code: string;
  message: string;
}

export const ErrorCodes = {
  ORDER_CREATE_FAILED: {
    statusCode: 500,
    code: '1001',
    message: 'Order creation failed',
  },
  ORDER_NOT_FOUND: {
    statusCode: 404,
    code: '1002',
    message: 'Order not found',
  },
  WALLET_INSUFFICIENT_FUNDS: {
    statusCode: 402,
    code: '2001',
    message: 'Insufficient funds',
  },
  WALLET_DEDUCTION_FAILED: {
    statusCode: 502,
    code: '2002',
    message: 'Wallet deduction failed',
  },
  WALLET_UNKNOWN: {
    statusCode: 502,
    code: '2003',
    message: 'Wallet service unavailable',
  },
  VALIDATION_FAILED: {
    statusCode: 400,
    code: '3001',
    message: 'Validation failed',
  },
  KYT_CHECK_FAILED: {
    statusCode: 400,
    code: '3002',
    message: 'KYT check failed',
  },
  INTERNAL_SERVER_ERROR: {
    statusCode: 500,
    code: '9001',
    message: 'Internal server error',
  },
} as const satisfies Record<string, ErrorDefinition>;

export type ErrorCode = keyof typeof ErrorCodes;
