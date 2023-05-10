import { AppDataSource } from "../../data-source"
import AgendamentosDB from "../../entity/agendamentos"
import ClientesDB from "../../entity/clientes"
import CorretoresDB from "../../entity/corretores"
import ImoveisDB from "../../entity/imoveis"

import { ServicoCliente } from "./cliente"


let dataSource

describe('ServicoCliente', ()=>{
    beforeAll(async () =>{
        dataSource = await AppDataSource.initialize()
    })
    describe('listar', ()=>{
        it('Deve retornar uma lista com os clientes', async ()=>{
            const repositorioCliente = dataSource.getRepository(ClientesDB)
            const servicoCliente = new ServicoCliente(repositorioCliente)
            const repositorioCorretor = dataSource.getRepository(CorretoresDB)
            const repositorioImovel = dataSource.getRepository(ImoveisDB)
            const repositorioAgendamento = dataSource.getRepository(AgendamentosDB)

            await repositorioAgendamento.query(`delete from agendamentos`)
            await repositorioCliente.query(`delete from clientes`)
            await repositorioCorretor.query(`delete from corretores`)
            await repositorioImovel.query(`delete from imoveis`)

            const clienteDB = new ClientesDB()
            clienteDB.nome = 'Ana'
            clienteDB.tel = '123'
            clienteDB.email = 'ana@gmail.com'
            await repositorioCliente.save(clienteDB)

            const clienteDB1 = new ClientesDB()
            clienteDB1.nome = 'Ana1'
            clienteDB1.tel = '123'
            clienteDB1.email = 'ana@gmail.com'
            await repositorioCliente.save(clienteDB1)

            const listar = await servicoCliente.listar()

            expect(listar).toEqual([{
                id: clienteDB.id,
                nome: 'Ana',
                tel:'123',
                email: 'ana@gmail.com'
            },{
                id: clienteDB1.id,
                nome: 'Ana1',
                tel:'123',
                email: 'ana@gmail.com'
            }])
        })
    })

    describe('get', ()=>{
        it('Deve retornar um cliente', async ()=>{
            const repositorioCliente = dataSource.getRepository(ClientesDB)
            const servicoCliente = new ServicoCliente(repositorioCliente)
            const repositorioCorretor = dataSource.getRepository(CorretoresDB)
            const repositorioImovel = dataSource.getRepository(ImoveisDB)
            const repositorioAgendamento = dataSource.getRepository(AgendamentosDB)

            await repositorioAgendamento.query(`delete from agendamentos`)
            await repositorioCliente.query(`delete from clientes`)
            await repositorioCorretor.query(`delete from corretores`)
            await repositorioImovel.query(`delete from imoveis`)

            const clienteDB = new ClientesDB()
            clienteDB.nome = 'Ana'
            clienteDB.tel = '123'
            clienteDB.email = 'ana@gmail.com'
            await repositorioCliente.save(clienteDB)

            const res = await servicoCliente.get(clienteDB.id)

            expect(res).toEqual({
                id: clienteDB.id,
                nome: 'Ana',
                tel:'123',
                email: 'ana@gmail.com'
            })
        })
    })

    describe('create', ()=>{
        it('Deve  criar um cliente no Banco de dados', async ()=>{
            const repositorioCliente = dataSource.getRepository(ClientesDB)
            const servicoCliente = new ServicoCliente(repositorioCliente)
            const repositorioCorretor = dataSource.getRepository(CorretoresDB)
            const repositorioImovel = dataSource.getRepository(ImoveisDB)
            const repositorioAgendamento = dataSource.getRepository(AgendamentosDB)

            await repositorioAgendamento.query(`delete from agendamentos`)
            await repositorioCliente.query(`delete from clientes`)
            await repositorioCorretor.query(`delete from corretores`)
            await repositorioImovel.query(`delete from imoveis`)

            const idCliente = await servicoCliente.create(
                'Ana',
                '123',
                'ana@gmail.com'
            )

            const res = await repositorioCliente.findOne({
                where:{
                    id: idCliente
                }
            })

            expect(res).toEqual({
                id: idCliente,
                nome: 'Ana',
                tel:'123',
                email: 'ana@gmail.com'
            })
        })
    })

    describe('update', ()=>{
        it('Deve retornar alterar um cliente', async ()=>{
            const repositorioCliente = dataSource.getRepository(ClientesDB)
            const servicoCliente = new ServicoCliente(repositorioCliente)
            const repositorioCorretor = dataSource.getRepository(CorretoresDB)
            const repositorioImovel = dataSource.getRepository(ImoveisDB)
            const repositorioAgendamento = dataSource.getRepository(AgendamentosDB)

            await repositorioAgendamento.query(`delete from agendamentos`)
            await repositorioCliente.query(`delete from clientes`)
            await repositorioCorretor.query(`delete from corretores`)
            await repositorioImovel.query(`delete from imoveis`)

            const clienteDB = new ClientesDB()
            clienteDB.nome = 'Ana'
            clienteDB.tel = '123'
            clienteDB.email = 'ana@gmail.com'
            await repositorioCliente.save(clienteDB)

            await servicoCliente.update(
                clienteDB.id,
                'Ana1',
                '123',
                'ana@gmail.com'
            )

            const res = await repositorioCliente.findOne({
                where:{
                    id: clienteDB.id
                }
            })

            expect(res).toEqual({
                id: clienteDB.id,
                nome: 'Ana1',
                tel:'123',
                email: 'ana@gmail.com'
            })
        })
    })
})