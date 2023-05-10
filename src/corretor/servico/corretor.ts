import { Repository } from "typeorm";
import CorretoresDB from "../../entity/corretores";
import { Corretor } from "../dominio/corretor";


export class ServicoCorretor{
    repositorioCorretor: Repository<CorretoresDB>

    constructor(repositorioCorretor: Repository<CorretoresDB>){
        this.repositorioCorretor = repositorioCorretor
    }

    async listar(): Promise<Corretor[]>{
        const corretorDB = await this.repositorioCorretor.find()

        const corretores : Corretor[] = []

        corretorDB.forEach(corretor=>{
            corretores.push(new Corretor(corretor.id, corretor.nome, corretor.tel, 
                corretor.email, corretor.ativo))
        })

        return corretores
    }

    async get(id:number): Promise<Corretor>{
        const corretorDB = await this.repositorioCorretor.findOne({
            where:{
                id: id
            }
        })
        if (!corretorDB) {
            throw new Error('Corretor não encontrado')
        }

        const corretor = new Corretor(
            corretorDB.id,
            corretorDB.nome,
            corretorDB.tel,
            corretorDB.email,
            corretorDB.ativo
        )
        return corretor
    }

    async create(nome: string, tel: string, email: string, ativo: boolean): Promise<number>{

        const corretorDB = new CorretoresDB()
        corretorDB.nome = nome
        corretorDB.tel = tel
        corretorDB.email = email
        corretorDB.ativo = ativo

        await this.repositorioCorretor.save(corretorDB)

        return corretorDB.id
    }

    async update(id: number, nome: string, tel: string, email: string): Promise<void>{

        const corretorDB = await this.repositorioCorretor.findOne({
            where:{
                id: id
            }
        })

        if (!corretorDB) {
            throw new Error('Corretor não encontrado')
        }

        corretorDB.nome = nome
        corretorDB.tel = tel
        corretorDB.email = email

        await this.repositorioCorretor.save(corretorDB)
    }

    async ativar(id: number): Promise<void>{

        const corretorDB = await this.repositorioCorretor.findOne({
            where:{
                id: id,
                ativo: false
            }
        })

        if (!corretorDB) {
            throw new Error('Corretor não encontrado ou ativo')
        }

        corretorDB.ativo = true

        await this.repositorioCorretor.save(corretorDB)
    }

    async desativar(id: number): Promise<void>{

        const corretorDB = await this.repositorioCorretor.findOne({
            where:{
                id: id,
                ativo: true
            }
        })

        if (!corretorDB) {
            throw new Error('Corretor não encontrado ou inativo')
        }

        corretorDB.ativo = false

        await this.repositorioCorretor.save(corretorDB)
    }

}