/* eslint-disable func-style */

import { plainToClass } from 'class-transformer';
import { IsEnum, IsNotEmpty, IsNumber, IsString, validateSync } from 'class-validator';

// eslint-disable-next-line no-shadow
enum NodeEnvironmentEnum {
  Development = 'development',
  Production = 'production',
  Test = 'test',
}

export class EnvironmentValidator {
  @IsEnum(NodeEnvironmentEnum)
  NODE_ENV: NodeEnvironmentEnum;

  @IsNumber()
  PORT = 3003;

  @IsNotEmpty()
  @IsString()
  DATABASE_URL: string;
}

export function validate(config: Record<string, unknown>) {
  const validatedConfig = plainToClass(EnvironmentValidator, config, {
    enableImplicitConversion: true,
  });

  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }
  return validatedConfig;
}

/* eslint-enable */
