import { SwaggerConfig } from './swagger.interface';

export const SWAGGER_CONFIG: SwaggerConfig = {
  title: process.env.SWAGGER_TITLE,
  description: process.env.SWAGGER_DESCRIPTION,
  version: process.env.SWAGGER_VERSION,
  tags: [process.env.SWAGGER_TAGS],
};
