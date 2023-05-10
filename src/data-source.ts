import { DataSource } from "typeorm";
import ClientesDB from "./entity/clientes";
import CorretoresDB from "./entity/corretores";
import ProprietariosDB from "./entity/proprietarios";
import ImoveisDB from "./entity/imoveis";
import AgendamentosDB from "./entity/agendamentos";
import ImoveisDoProprietarioDB from "./entity/imoveis_do_proprietario";
import { CriarImoveis1683667628915 } from "./migration/1683667628915-CriarImoveis";
import { CriarClientes1683668527779 } from "./migration/1683668527779-CriarClientes";
import { CriarCorretores1683668638212 } from "./migration/1683668638212-CriarCorretores";
import { CriarTabelaProprietarios1683303379743 } from "./migration/1683303379743-CriarProprietarios";
import { CriarAgendamentos1683670956362 } from "./migration/1683670956362-CriarAgendamentos";
import { CriarImoveisDoProprietario1683737089265 } from "./migration/1683737089265-CriarImoveisDoProprietario";

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


    migrations: [CriarClientes1683668527779, CriarCorretores1683668638212, CriarTabelaProprietarios1683303379743,
        CriarImoveisDoProprietario1683737089265,CriarAgendamentos1683670956362, CriarImoveis1683667628915
    ],


    
    subscribers: [],
})