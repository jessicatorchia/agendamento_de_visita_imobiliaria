import { DataSource } from "typeorm";
import ClientesDB from "./entity/clientes";
import CorretoresDB from "./entity/corretores";
import ProprietariosDB from "./entity/proprietarios";
import ImoveisDB from "./entity/imoveis";
import AgendamentosDB from "./entity/agendamentos";
import ImoveisDoProprietarioDB from "./entity/imoveis_do_proprietario";
import { CriarTabelaAgendamentos1683500519340 } from "./migration/1683500519340-CriarTabelaAgendamentos";
import { CriarTabelaCliente1683302443862 } from "./migration/1683302443862-CriarTabelaClientes";
import { CriarTabelaImoveis1683303963802 } from "./migration/1683303963802-CriarTabelaImoveis";
import { CriarTabelaCorretores1683302588979 } from "./migration/1683302588979-CriarTabelaCorretores";
import { CriarTabelaImoveisDoProprietario1683304764102 } from "./migration/1683304764102-CriarTabelaImoveisDoProprietario";
import { CriarTabelaProprietarios1683303379743 } from "./migration/1683303379743-CriarTabelaProprietarios";

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: process.env.HOST,
    port: 5432,
    username: 'example',
    password: 'example',
    database: 'postgres',
    synchronize: false,
    logging: true,


    entities: [ClientesDB, CorretoresDB, ProprietariosDB, ImoveisDB, AgendamentosDB, ImoveisDoProprietarioDB
    ],


    migrations: [CriarTabelaCliente1683302443862, CriarTabelaCorretores1683302588979, CriarTabelaProprietarios1683303379743,
        CriarTabelaImoveis1683303963802, CriarTabelaImoveisDoProprietario1683304764102,CriarTabelaAgendamentos1683500519340
    ],


    
    subscribers: [],
})