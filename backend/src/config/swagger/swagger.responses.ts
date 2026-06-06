import { ApiResponseOptions } from '@nestjs/swagger';

export const SwaggerResponses: Record<string, ApiResponseOptions> = {
  badRequest: {
    status: 400,
    description: 'Bad request',
  },

  unauthorized: {
    status: 401,
    description: 'Unauthorized',
  },

  forbidden: {
    status: 403,
    description: 'Forbidden',
  },

  notFound: {
    status: 404,
    description: 'Resource not found',
  },

  conflict: {
    status: 409,
    description: 'Conflict',
  },

  internalServerError: {
    status: 500,
    description: 'Internal server error',
  },
};
