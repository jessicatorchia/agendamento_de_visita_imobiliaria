import { AppDataSource } from "../../data-source"
import ImoveisDoProprietarioDB from "../../entity/imoveis_do_proprietario"
import ProprietariosDB from "../../entity/proprietarios"
import { ServicoProprietario } from "./proprietario"


let dataSource

describe('ServicoProprietario', ()=>{
    beforeAll(async () =>{
        dataSource = await AppDataSource.initialize()
    })
    describe('listar', ()=>{
        it('Deve retornar uma lista com os proprietarios', async ()=>{
            const repositorioProprietario = dataSource.getRepository(ProprietariosDB)
            const repositorioImoveisDoProprietario = dataSource.getRepository(ImoveisDoProprietarioDB)
            const servicoProprietario = new ServicoProprietario(repositorioProprietario, repositorioImoveisDoProprietario)
            
            await repositorioProprietario.query(`delete from proprietarios`)
            
            const proprietarioDB = new ProprietariosDB()
            proprietarioDB.nome = 'Ana'
            proprietarioDB.tel = '123'
            proprietarioDB.email = 'ana@gmail.com'
            await repositorioProprietario.save(proprietarioDB)

            const proprietarioDB1 = new ProprietariosDB()
            proprietarioDB1.nome = 'Ana1'
            proprietarioDB1.tel = '123'
            proprietarioDB1.email = 'ana@gmail.com'
            await repositorioProprietario.save(proprietarioDB1)

            const listar = await servicoProprietario.listar()

            expect(listar).toEqual([{
                id: proprietarioDB.id,
                nome: 'Ana',
                tel:'123',
                email: 'ana@gmail.com'
            },{
                id: proprietarioDB1.id,
                nome: 'Ana1',
                tel:'123',
                email: 'ana@gmail.com'
            }])
        })
    })

    describe('get', ()=>{
        it('Deve retornar um proprietario', async ()=>{
            const repositorioProprietario = dataSource.getRepository(ProprietariosDB)
            const repositorioImoveisDoProprietario = dataSource.getRepository(ImoveisDoProprietarioDB)
            const servicoProprietario = new ServicoProprietario(repositorioProprietario, repositorioImoveisDoProprietario)
            
            await repositorioProprietario.query(`delete from proprietarios`)

            const proprietarioDB = new ProprietariosDB()
            proprietarioDB.nome = 'Ana'
            proprietarioDB.tel = '123'
            proprietarioDB.email = 'ana@gmail.com'
            await repositorioProprietario.save(proprietarioDB)

            const res = await servicoProprietario.get(proprietarioDB.id)

            expect(res).toEqual({
                id: proprietarioDB.id,
                nome: 'Ana',
                tel:'123',
                email: 'ana@gmail.com'
            })
        })
    })

    describe('create', ()=>{
        it('Deve  criar um proprietario no Banco de dados', async ()=>{
            const repositorioProprietario = dataSource.getRepository(ProprietariosDB)
            const repositorioImoveisDoProprietario = dataSource.getRepository(ImoveisDoProprietarioDB)
            const servicoProprietario = new ServicoProprietario(repositorioProprietario, repositorioImoveisDoProprietario)
            
            await repositorioProprietario.query(`delete from proprietarios`)

            const idProprietario = await servicoProprietario.create(
                'Ana',
                '123',
                'ana@gmail.com'
            )

            const res = await repositorioProprietario.findOne({
                where:{
                    id: idProprietario
                }
            })

            expect(res).toEqual({
                id: idProprietario,
                nome: 'Ana',
                tel:'123',
                email: 'ana@gmail.com'
            })
        })
    })

    describe('update', ()=>{
        it('Deve retornar alterar um proprietario', async ()=>{
            const repositorioProprietario = dataSource.getRepository(ProprietariosDB)
            const repositorioImoveisDoProprietario = dataSource.getRepository(ImoveisDoProprietarioDB)
            const servicoProprietario = new ServicoProprietario(repositorioProprietario, repositorioImoveisDoProprietario)
            
            await repositorioProprietario.query(`delete from proprietarios`)

            const proprietarioDB = new ProprietariosDB()
            proprietarioDB.nome = 'Ana'
            proprietarioDB.tel = '123'
            proprietarioDB.email = 'ana@gmail.com'
            await repositorioProprietario.save(proprietarioDB)

            await servicoProprietario.update(
                proprietarioDB.id,
                'Ana1',
                '123',
                'ana@gmail.com'
            )

            const res = await repositorioProprietario.findOne({
                where:{
                    id: proprietarioDB.id
                }
            })

            expect(res).toEqual({
                id: proprietarioDB.id,
                nome: 'Ana1',
                tel:'123',
                email: 'ana@gmail.com'
            })
        })
    })
})