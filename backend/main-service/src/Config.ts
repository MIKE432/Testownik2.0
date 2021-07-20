import {Connection, ConnectionOptions} from "typeorm";
import {TypeOrmModuleOptions} from "@nestjs/typeorm/dist/interfaces/typeorm-options.interface";

export interface Config {
    db: Partial<TypeOrmModuleOptions>
}

export const ConfigOptions: Config = {
    db: {
        type: "postgres",
        host: "localhost",
        port: 5432,
        username: "mike",
        password: "1211",
        database: "testownik",
        synchronize: true,
        logging: true
    }
}