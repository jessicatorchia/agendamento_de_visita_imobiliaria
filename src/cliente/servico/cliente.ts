import { Repository } from "typeorm";
import ClientesDB from "../../entity/clientes";
import { Cliente } from "../dominio/cliente";

export class ServicoCliente{
    repositorioCliente: Repository<ClientesDB>

    constructor(repositorioCliente: Repository<ClientesDB>){
        this.repositorioCliente = repositorioCliente
    }

    async listar(): Promise<Cliente[]>{
        const clienteDB = await this.repositorioCliente.find()

        const clientes : Cliente[] = []

        clienteDB.forEach(cliente=>{
            clientes.push(new Cliente(cliente.id, cliente.nome, cliente.tel, cliente.email))
        })

        return clientes
    }

    async get(id:number): Promise<Cliente>{
        const clienteDB = await this.repositorioCliente.findOne({
            where:{
                id: id
            }
        })
        if (!clienteDB) {
            throw new Error('Cliente não encontrado')
        }

        const cliente = new Cliente(
            clienteDB.id,
            clienteDB.nome,
            clienteDB.tel,
            clienteDB.email
        )
        return cliente
    }

    async create(nome: string, tel: string, email: string): Promise<number>{

        const clienteDB = new ClientesDB()
        clienteDB.nome = nome
        clienteDB.tel = tel
        clienteDB.email = email

        await this.repositorioCliente.save(clienteDB)

        return clienteDB.id
    }

    async update(id: number, nome: string, tel: string, email: string): Promise<void>{

        const clienteDB = await this.repositorioCliente.findOne({
            where:{
                id: id
            }
        })

        if (!clienteDB) {
            throw new Error('Cliente não encontrado')
        }

        clienteDB.nome = nome
        clienteDB.tel = tel
        clienteDB.email = email

        await this.repositorioCliente.save(clienteDB)
    }
}

