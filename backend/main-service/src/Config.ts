import { Connection, ConnectionOptions } from 'typeorm';
import { TypeOrmModuleOptions } from '@nestjs/typeorm/dist/interfaces/typeorm-options.interface';

export type AdditionalConfigInfo = {
  host?: string;
  port?: number;
  username?: string;
  password?: string;
  type: 'postgres'
}

export interface Config {
  db: TypeOrmModuleOptions & AdditionalConfigInfo
}

export const ConfigOptions: Config = {
  db: {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: '1211',
    database: 'testownik',
    synchronize: true,
    logging: true
  },
};

export function configOptions(): Config {
  let baseConfig: Config = { ...ConfigOptions }

  return {
    db: {
      type: baseConfig.db.type ?? 'postgres',
      host: baseConfig.db.host ?? process.env.DB_HOST,
      port: baseConfig.db.port ?? Number(process.env.DB_PORT),
      username: baseConfig.db.username ?? process.env.DB_USERNAME,
      password: baseConfig.db.password ?? process.env.DB_PASSWORD,
      database: baseConfig.db.database ?? process.env.DB_DATABASE,
      synchronize: baseConfig.db.synchronize ?? process.env.DB_SYNCHRONIZE === 'true',
      logging: baseConfig.db.logging ?? process.env.DB_LOGGING === 'true',
    },
  };
}