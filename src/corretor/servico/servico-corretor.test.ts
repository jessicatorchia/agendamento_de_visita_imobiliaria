
import { AppDataSource } from "../../data-source"
import AgendamentosDB from "../../entity/agendamentos"
import ClientesDB from "../../entity/clientes"
import CorretoresDB from "../../entity/corretores"
import ImoveisDB from "../../entity/imoveis"
import { ServicoCorretor } from "./corretor"


let dataSource

describe('ServicoCorretor', ()=>{
    beforeAll(async () =>{
        dataSource = await AppDataSource.initialize()
    })
    describe('listar', ()=>{
        it('Deve retornar uma lista com os corretores', async ()=>{
            const repositorioCliente = dataSource.getRepository(ClientesDB)
            const repositorioCorretor = dataSource.getRepository(CorretoresDB)
            const servicoCorretor = new ServicoCorretor(repositorioCorretor)
            const repositorioImovel = dataSource.getRepository(ImoveisDB)
            const repositorioAgendamento = dataSource.getRepository(AgendamentosDB)

            await repositorioAgendamento.query(`delete from agendamentos`)            
            await repositorioCliente.query(`delete from clientes`)
            await repositorioCorretor.query(`delete from corretores`)
            await repositorioImovel.query(`delete from imoveis`)

            const corretoresDB = new CorretoresDB()
            corretoresDB.nome = 'Ana'
            corretoresDB.tel = '123'
            corretoresDB.email = 'ana@gmail.com',
            corretoresDB.ativo = true
            await repositorioCorretor.save(corretoresDB)

            const corretoresDB1 = new CorretoresDB()
            corretoresDB1.nome = 'Ana1'
            corretoresDB1.tel = '123'
            corretoresDB1.email = 'ana@gmail.com'
            corretoresDB1.ativo = false
            await repositorioCorretor.save(corretoresDB1)

            const listar = await servicoCorretor.listar()

            expect(listar).toEqual([{
                id: corretoresDB.id,
                nome: 'Ana',
                tel:'123',
                email: 'ana@gmail.com',
                ativo : true
            },{
                id: corretoresDB1.id,
                nome: 'Ana1',
                tel:'123',
                email: 'ana@gmail.com',
                ativo: false
            }])
        })
    })

    describe('get', ()=>{
        it('Deve retornar um corretor', async ()=>{
            const repositorioCliente = dataSource.getRepository(ClientesDB)
            const repositorioCorretor = dataSource.getRepository(CorretoresDB)
            const servicoCorretor = new ServicoCorretor(repositorioCorretor)
            const repositorioImovel = dataSource.getRepository(ImoveisDB)
            const repositorioAgendamento = dataSource.getRepository(AgendamentosDB)

            await repositorioAgendamento.query(`delete from agendamentos`)
            await repositorioCorretor.query(`delete from corretores`)

            const corretoresDB = new CorretoresDB()
            corretoresDB.nome = 'Ana'
            corretoresDB.tel = '123'
            corretoresDB.email = 'ana@gmail.com'
            corretoresDB.ativo = true
            await repositorioCorretor.save(corretoresDB)

            const res = await servicoCorretor.get(corretoresDB.id)

            expect(res).toEqual({
                id: corretoresDB.id,
                nome: 'Ana',
                tel:'123',
                email: 'ana@gmail.com',
                ativo: true
            })
        })
    })

    describe('create', ()=>{
        it('Deve  criar um corretor no Banco de dados', async ()=>{
            const repositorioCliente = dataSource.getRepository(ClientesDB)
            const repositorioCorretor = dataSource.getRepository(CorretoresDB)
            const servicoCorretor = new ServicoCorretor(repositorioCorretor)
            const repositorioImovel = dataSource.getRepository(ImoveisDB)
            const repositorioAgendamento = dataSource.getRepository(AgendamentosDB)

            await repositorioAgendamento.query(`delete from agendamentos`)
            await repositorioCorretor.query(`delete from corretores`)


            const idCorretor = await servicoCorretor.create(
                'Ana',
                '123',
                'ana@gmail.com',
                true
            )

            const res = await repositorioCorretor.findOne({
                where:{
                    id: idCorretor
                }
            })

            expect(res).toEqual({
                id: idCorretor,
                nome: 'Ana',
                tel:'123',
                email: 'ana@gmail.com',
                ativo: true
            })
        })
    })

    describe('update', ()=>{
        it('Deve retornar alterar um corretor', async ()=>{
            const repositorioCliente = dataSource.getRepository(ClientesDB)
            const repositorioCorretor = dataSource.getRepository(CorretoresDB)
            const servicoCorretor = new ServicoCorretor(repositorioCorretor)
            const repositorioImovel = dataSource.getRepository(ImoveisDB)
            const repositorioAgendamento = dataSource.getRepository(AgendamentosDB)

            await repositorioAgendamento.query(`delete from agendamentos`)
            await repositorioCorretor.query(`delete from corretores`)

            const corretoresDB = new CorretoresDB()
            corretoresDB.nome = 'Ana'
            corretoresDB.tel = '123'
            corretoresDB.email = 'ana@gmail.com'
            corretoresDB.ativo = true
            await repositorioCorretor.save(corretoresDB)

            await servicoCorretor.update(
                corretoresDB.id,
                'Ana1',
                '123',
                'ana@gmail.com'
            )

            const res = await repositorioCorretor.findOne({
                where:{
                    id: corretoresDB.id
                }
            })

            expect(res).toEqual({
                id: corretoresDB.id,
                nome: 'Ana1',
                tel:'123',
                email: 'ana@gmail.com',
                ativo: true
            })
        })
    })

    describe('ativar', ()=>{
        it('Deve retornar alterar um corretor', async ()=>{
            const repositorioCliente = dataSource.getRepository(ClientesDB)
            const repositorioCorretor = dataSource.getRepository(CorretoresDB)
            const servicoCorretor = new ServicoCorretor(repositorioCorretor)
            const repositorioImovel = dataSource.getRepository(ImoveisDB)
            const repositorioAgendamento = dataSource.getRepository(AgendamentosDB)

            await repositorioAgendamento.query(`delete from agendamentos`)
            await repositorioCliente.query(`delete from clientes`)
            await repositorioCorretor.query(`delete from corretores`)
            await repositorioImovel.query(`delete from imoveis`)

            const corretoresDB = new CorretoresDB()
            corretoresDB.nome = 'Ana'
            corretoresDB.tel = '123'
            corretoresDB.email = 'ana@gmail.com'
            corretoresDB.ativo = false
            await repositorioCorretor.save(corretoresDB)

            await servicoCorretor.ativar(corretoresDB.id)
            

            const res = await repositorioCorretor.findOne({
                where:{
                    id: corretoresDB.id
                }
            })

            expect(res).toEqual({
                id: corretoresDB.id,
                nome: 'Ana',
                tel:'123',
                email: 'ana@gmail.com',
                ativo: true
            })
        })
    })

    describe('desativar', ()=>{
        it('Deve retornar alterar um corretor', async ()=>{
            const repositorioCliente = dataSource.getRepository(ClientesDB)
            const repositorioCorretor = dataSource.getRepository(CorretoresDB)
            const servicoCorretor = new ServicoCorretor(repositorioCorretor)
            const repositorioImovel = dataSource.getRepository(ImoveisDB)
            const repositorioAgendamento = dataSource.getRepository(AgendamentosDB)

            await repositorioAgendamento.query(`delete from agendamentos`)
            await repositorioCliente.query(`delete from clientes`)
            await repositorioCorretor.query(`delete from corretores`)
            await repositorioImovel.query(`delete from imoveis`)

            const corretoresDB = new CorretoresDB()
            corretoresDB.nome = 'Ana'
            corretoresDB.tel = '123'
            corretoresDB.email = 'ana@gmail.com'
            corretoresDB.ativo = true
            await repositorioCorretor.save(corretoresDB)

            await servicoCorretor.desativar(corretoresDB.id)
            

            const res = await repositorioCorretor.findOne({
                where:{
                    id: corretoresDB.id
                }
            })

            expect(res).toEqual({
                id: corretoresDB.id,
                nome: 'Ana',
                tel:'123',
                email: 'ana@gmail.com',
                ativo: false
            })
        })
    })
})