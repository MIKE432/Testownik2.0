import { TypeOrmModuleOptions } from '@nestjs/typeorm/dist/interfaces/typeorm-options.interface';
import { INestApplication } from '@nestjs/common';
import path from 'path';

export type AdditionalConfigInfo = {
  host?: string;
  port?: number;
  username?: string;
  password?: string;
  type: 'postgres';
};

export interface Config {
  db: TypeOrmModuleOptions & AdditionalConfigInfo;
  appPort?: number;
}

export const ConfigOptions: Config = {
  db: {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    database: 'testownik',
    synchronize: true,
    logging: true
  }
};

export function configOptions(): Config {
  let baseConfig: Config = { ...ConfigOptions };

  return {
    db: {
      type: baseConfig.db.type ?? 'postgres',
      host: baseConfig.db.host ?? process.env.DB_HOST,
      port: baseConfig.db.port ?? Number(process.env.DB_PORT),
      username: baseConfig.db.username ?? process.env.DB_USERNAME,
      password: baseConfig.db.password ?? process.env.DB_PASSWORD,
      database: baseConfig.db.database ?? process.env.DB_DATABASE,
      synchronize:
        baseConfig.db.synchronize ?? process.env.DB_SYNCHRONIZE === 'true',
      logging: baseConfig.db.logging ?? process.env.DB_LOGGING === 'true'
    },
    appPort: baseConfig.appPort ?? Number(process.env.PORT)
  };
}

export type ConfigFunction = (app: INestApplication) => void;

export const applyConfig = (
  app: INestApplication,
  ...configFunctions: ConfigFunction[]
) => {
  configFunctions.forEach((fn) => fn(app));
};

//this class is important due to needed help of managing base urls
interface Urls {
  [url: string]: string;
}
export class UrlManager {
  private readonly urls: Urls;
  public static quizUrl = 'quiz/';
  public static questionUrl = 'question/';
  public static answerUrl = 'answer/';

  constructor() {
    this.urls = {
      mainService: 'http://localhost:4000/api/'
    };
    //init the urls from .env
  }

  getMainServiceUrl(optionParams: string = ''): string {
    return this.urls.mainService + optionParams;
  }

  getQuizEndpointUrl(...param: any[]): string {
    return this.getMainServiceUrl(UrlManager.quizUrl + param.join('/'));
  }

  getQuestionEndpointUrl(...param: any[]): string {
    return this.getMainServiceUrl(UrlManager.quizUrl + param.join('/'));
  }

  getAnswerEndpointUrl(...param: any[]): string {
    return this.getMainServiceUrl(UrlManager.quizUrl + param.join('/'));
  }
}
