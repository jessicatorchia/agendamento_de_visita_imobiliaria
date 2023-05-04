import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: process.env.HOST,
    port: 5432,
    username: 'example',
    password: 'example',
    database: 'postgres',
    synchronize: false,
    logging: true,


    entities: [
    ],


    migrations: [
        
    ],


    
    subscribers: [],
})