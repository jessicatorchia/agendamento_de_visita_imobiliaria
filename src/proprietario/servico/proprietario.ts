import { Repository } from "typeorm";
import ProprietariosDB from "../../entity/proprietarios";
import { Proprietario } from "../dominio/proprietario";
import ImoveisDoProprietarioDB from "../../entity/imoveis_do_proprietario";
import { ServicoImovel } from "../../imoveis/servico/imoveis";



export class ServicoProprietario {
    repositorioProprietario: Repository<ProprietariosDB>
    repositorioImoveisDoProprietario: Repository<ImoveisDoProprietarioDB>

    constructor(repositorioProprietario: Repository<ProprietariosDB>,
        repositorioImoveisDoProprietario: Repository<ImoveisDoProprietarioDB>,

    ) {
        this.repositorioProprietario = repositorioProprietario
        this.repositorioImoveisDoProprietario = repositorioImoveisDoProprietario

    }

    async listar(): Promise<Proprietario[]> {
        const proprietarioDB = await this.repositorioProprietario.find()

        const proprietarios: Proprietario[] = []

        proprietarioDB.forEach(proprietario => {
            proprietarios.push(new Proprietario(proprietario.id, proprietario.nome, proprietario.tel, proprietario.email))
        })

        return proprietarios
    }

    async get(id: number): Promise<Proprietario> {
        const proprietarioDB = await this.repositorioProprietario.findOne({
            where: {
                id: id
            }
        })
        if (!proprietarioDB) {
            throw new Error('Cliente não encontrado')
        }

        const cliente = new Proprietario(
            proprietarioDB.id,
            proprietarioDB.nome,
            proprietarioDB.tel,
            proprietarioDB.email
        )
        return cliente
    }

    async create(nome: string, tel: string, email: string): Promise<number> {

        const proprietarioDB = new ProprietariosDB()
        proprietarioDB.nome = nome
        proprietarioDB.tel = tel
        proprietarioDB.email = email

        await this.repositorioProprietario.save(proprietarioDB)

        return proprietarioDB.id
    }

    async update(id: number, nome: string, tel: string, email: string): Promise<void> {

        const proprietarioDB = await this.repositorioProprietario.findOne({
            where: {
                id: id
            }
        })

        if (!proprietarioDB) {
            throw new Error('Cliente não encontrado')
        }

        proprietarioDB.nome = nome
        proprietarioDB.tel = tel
        proprietarioDB.email = email

        await this.repositorioProprietario.save(proprietarioDB)
    }


}