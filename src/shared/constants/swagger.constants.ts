export const SWAGGER_AUTH_SCHEMES = {
  JWT: 'JWT-auth',
} as const;

export type SwaggerAuthScheme =
  (typeof SWAGGER_AUTH_SCHEMES)[keyof typeof SWAGGER_AUTH_SCHEMES];
