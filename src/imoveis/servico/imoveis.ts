import { Repository } from "typeorm";
import ImoveisDB from "../../entity/imoveis";
import { Imovel } from "../dominio/imoveis";
import ImoveisDoProprietarioDB from "../../entity/imoveis_do_proprietario";
import { ServicoProprietario } from "../../proprietario/servico/proprietario";

interface GetImoveis {
    cidade: string,
    bairro: string,
    endereco: string,
    valor_aluguel: number,
    valor_venda: number
}

interface GetImoveisProprietario {
    id: number,
    nome: string,
    tel: string,
    email: string,
    imoveis: GetImoveis[]
}

interface GetImovelProprietario {
    id: number,
    cidade: string,
    bairro: string,
    endereco: string,
    valor_aluguel: number,
    valor_venda: number,
    ativo: boolean,
    proprietario_nome: string
    proprietario_tel: string
    proprietario_email: string
}

export class ServicoImovel {
    repositorioImovel: Repository<ImoveisDB>
    repositorioImoveisDoProprietario: Repository<ImoveisDoProprietarioDB>
    servicoProprietario: ServicoProprietario

    constructor(repositorioImovel: Repository<ImoveisDB>,
        repositorioImoveisDoProprietario: Repository<ImoveisDoProprietarioDB>,
        servicoProprietario: ServicoProprietario
    ) {
        this.repositorioImovel = repositorioImovel
        this.repositorioImoveisDoProprietario = repositorioImoveisDoProprietario
        this.servicoProprietario = servicoProprietario
    }

    async listar(): Promise<Imovel[]> {
        const imovelDB = await this.repositorioImovel.find()

        const imoveis: Imovel[] = []

        imovelDB.forEach(imovel => {
            imoveis.push(new Imovel(imovel.id, imovel.cidade, imovel.bairro, imovel.endereco,
                imovel.valor_aluguel, imovel.valor_venda, imovel.ativo))
        })

        return imoveis
    }

    async getImovelProprietario(id: number): Promise<GetImovelProprietario> {
        const imovelDB = await this.repositorioImovel.findOne({
            where: {
                id: id
            }
        })
        if (!imovelDB) {
            throw new Error('Imovel não encontrado')
        }

        const imovelProprietarioDB = await this.repositorioImoveisDoProprietario.findOne({
            where: {
                imovel_id: id
            }
        })

        const proprietarioDB = await this.servicoProprietario.get(imovelProprietarioDB.proprietario_id)

        return {
            id: imovelDB.id,
            cidade:  imovelDB.cidade,
            bairro:  imovelDB.bairro,
            endereco:  imovelDB.endereco,
            valor_aluguel: imovelDB.valor_aluguel,
            valor_venda:  imovelDB.valor_venda,
            ativo: imovelDB.ativo,
            proprietario_nome: proprietarioDB.nome,
            proprietario_tel: proprietarioDB.tel,
            proprietario_email: proprietarioDB.email
        }

    }

    async getImoveisDoProprietario(id: number): Promise<GetImoveisProprietario> {
        const proprietarioDB = await this.servicoProprietario.get(id)

        const imoveisDoProprietarioDB = await this.repositorioImoveisDoProprietario.find({
            where: {
                proprietario_id: id
            }
        })

        if (!imoveisDoProprietarioDB[0]) {
            throw new Error('Imoveis do proprietario não encontrado')
        }


        return {
            id: proprietarioDB.id,
            nome: proprietarioDB.nome,
            tel: proprietarioDB.tel,
            email: proprietarioDB.email,
            imoveis: await Promise.all(imoveisDoProprietarioDB.map(async imovelDoProprietario =>{
                const imovel = await this.repositorioImovel.findOne({
                    where:{
                        id: imovelDoProprietario.imovel_id
                    }
                })
                return{
                    cidade: imovel.cidade,
                    bairro: imovel.bairro,
                    endereco: imovel.endereco,
                    valor_aluguel: imovel.valor_aluguel,
                    valor_venda: imovel.valor_venda
                }
            })),
        }
    }

    async get(id: number): Promise<Imovel> {
        const imovelDB = await this.repositorioImovel.findOne({
            where: {
                id: id
            }
        })
        if (!imovelDB) {
            throw new Error('Imovel não encontrado')
        }

        const imovel = new Imovel(
            imovelDB.id,
            imovelDB.cidade,
            imovelDB.bairro,
            imovelDB.endereco,
            imovelDB.valor_aluguel,
            imovelDB.valor_venda,
            imovelDB.ativo
        )
        return imovel
    }

    async create(cidade: string, bairro: string, endereco: string,
        valor_aluguel: number, valor_venda: number, ativo: boolean, proprietario_id: number): Promise<number> {

        const imovelDB = new ImoveisDB()
        imovelDB.cidade = cidade
        imovelDB.bairro = bairro
        imovelDB.endereco = endereco
        imovelDB.valor_aluguel = valor_aluguel
        imovelDB.valor_venda = valor_venda
        imovelDB.ativo = ativo
        await this.repositorioImovel.save(imovelDB)

        const proprietario = await this.servicoProprietario.get(proprietario_id)

        const imovelProprietarioDB = new ImoveisDoProprietarioDB()
        imovelProprietarioDB.imovel_id = imovelDB.id
        imovelProprietarioDB.proprietario_id = proprietario.id
        await this.repositorioImoveisDoProprietario.save(imovelProprietarioDB)

        return imovelDB.id
    }

    async update(id: number, cidade: string, bairro: string, endereco: string,
        valor_aluguel: number, valor_venda: number, proprietario_id:number): Promise<void> {

        const imovelDB = await this.repositorioImovel.findOne({
            where: {
                id: id
            }
        })

        if (!imovelDB) {
            throw new Error('Imovel não encontrado')
        }

        imovelDB.cidade = cidade
        imovelDB.bairro = bairro
        imovelDB.endereco = endereco
        imovelDB.valor_aluguel = valor_aluguel
        imovelDB.valor_venda = valor_venda

        await this.repositorioImovel.save(imovelDB)

        await this.repositorioImoveisDoProprietario.delete({
            imovel_id: id
        })

        const proprietario = await this.servicoProprietario.get(proprietario_id)

        const imovelProprietarioDB = new ImoveisDoProprietarioDB()
        imovelProprietarioDB.imovel_id = imovelDB.id
        imovelProprietarioDB.proprietario_id = proprietario.id
        await this.repositorioImoveisDoProprietario.save(imovelProprietarioDB)

    }

    async ativar(id: number): Promise<void> {

        const imovelDB = await this.repositorioImovel.findOne({
            where: {
                id: id,
                ativo: false
            }
        })

        if (!imovelDB) {
            throw new Error('Imovel não encontrado ou ativo')
        }

        imovelDB.ativo = true

        await this.repositorioImovel.save(imovelDB)
    }

    async desativar(id: number): Promise<void> {

        const imovelDB = await this.repositorioImovel.findOne({
            where: {
                id: id,
                ativo: true
            }
        })

        if (!imovelDB) {
            throw new Error('Imovel não encontrado ou inativo')
        }

        imovelDB.ativo = false

        await this.repositorioImovel.save(imovelDB)
    }
}

