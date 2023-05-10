import { AppDataSource } from "../../data-source"
import ImoveisDB from "../../entity/imoveis"
import ImoveisDoProprietarioDB from "../../entity/imoveis_do_proprietario"
import ProprietariosDB from "../../entity/proprietarios"
import { ServicoProprietario } from "../../proprietario/servico/proprietario"
import { ServicoImovel } from "./imoveis"


let dataSource

describe('ServicoImovel', () => {
    beforeAll(async () => {
        dataSource = await AppDataSource.initialize()
    })
    describe('listar', () => {
        it('Deve retornar um imovel cadastrado no banco', async () => {
            const repositorioImoveisDoProprietario = dataSource.getRepository(ImoveisDoProprietarioDB)
            const repositorioProprietario = dataSource.getRepository(ProprietariosDB)
            const servicoProprietario = new ServicoProprietario(repositorioProprietario, repositorioImoveisDoProprietario)
            const repositorioImovel = dataSource.getRepository(ImoveisDB)
            const servicoImovel = new ServicoImovel(repositorioImovel, repositorioImoveisDoProprietario, servicoProprietario)

            await repositorioImovel.query(`delete from imoveis`)

            const imovelDB = new ImoveisDB()
            imovelDB.cidade = 'Rio de Janeiro'
            imovelDB.bairro = 'Botafogo'
            imovelDB.endereco = 'Rua 4, n 5'
            imovelDB.valor_aluguel = 2500.00
            imovelDB.valor_venda = 4000000.00
            imovelDB.ativo = true
            await repositorioImovel.save(imovelDB)

            const imovelDB1 = new ImoveisDB()
            imovelDB1.cidade = 'Rio de Janeiro1'
            imovelDB1.bairro = 'Botafogo'
            imovelDB1.endereco = 'Rua 4, n 5'
            imovelDB1.valor_aluguel = 2500.00
            imovelDB1.valor_venda = 5000000.00
            imovelDB1.ativo = true
            await repositorioImovel.save(imovelDB1)

            const imoveis = await servicoImovel.listar()

            expect(imoveis).toEqual([{
                id: imovelDB.id,
                cidade: 'Rio de Janeiro',
                bairro: 'Botafogo',
                endereco: 'Rua 4, n 5',
                valor_aluguel: 2500.00,
                valor_venda: 4000000.00,
                ativo: true
            }, {
                id: imovelDB1.id,
                cidade: 'Rio de Janeiro1',
                bairro: 'Botafogo',
                endereco: 'Rua 4, n 5',
                valor_aluguel: 2500.00,
                valor_venda: 5000000.00,
                ativo: true
            }])
        })
    })

    describe('getImoveisDoProprietario', () => {
        it('Deve retornar os imoveis de  um proprietario', async () => {
            const repositorioImoveisDoProprietario = dataSource.getRepository(ImoveisDoProprietarioDB)
            const repositorioProprietario = dataSource.getRepository(ProprietariosDB)
            const servicoProprietario = new ServicoProprietario(repositorioProprietario, repositorioImoveisDoProprietario)
            const repositorioImovel = dataSource.getRepository(ImoveisDB)
            const servicoImovel = new ServicoImovel(repositorioImovel, repositorioImoveisDoProprietario, servicoProprietario)

            await repositorioImovel.query(`delete from imoveis`)

            const proprietarioDB = new ProprietariosDB()
            proprietarioDB.nome = 'Ana'
            proprietarioDB.tel = '123'
            proprietarioDB.email = 'ana@gmail.com'
            await repositorioProprietario.save(proprietarioDB)

            const imovelDB = new ImoveisDB()
            imovelDB.cidade = 'Rio de Janeiro'
            imovelDB.bairro = 'Botafogo'
            imovelDB.endereco = 'Rua 4, n 5'
            imovelDB.valor_aluguel = 2500.00
            imovelDB.valor_venda = 4000000.00
            imovelDB.ativo = true
            await repositorioImovel.save(imovelDB)

            const imovelDB1 = new ImoveisDB()
            imovelDB1.cidade = 'Rio de Janeiro1'
            imovelDB1.bairro = 'Botafogo'
            imovelDB1.endereco = 'Rua 4, n 5'
            imovelDB1.valor_aluguel = 2500.00
            imovelDB1.valor_venda = 5000000.00
            imovelDB1.ativo = true
            await repositorioImovel.save(imovelDB1)


            const imoveisDoProprietarioDB = new ImoveisDoProprietarioDB()
            imoveisDoProprietarioDB.imovel_id = imovelDB.id
            imoveisDoProprietarioDB.proprietario_id = proprietarioDB.id
            await repositorioImoveisDoProprietario.save(imoveisDoProprietarioDB)

            const imoveisDoProprietarioDB1 = new ImoveisDoProprietarioDB()
            imoveisDoProprietarioDB.imovel_id = imovelDB1.id
            imoveisDoProprietarioDB.proprietario_id = proprietarioDB.id
            await repositorioImoveisDoProprietario.save(imoveisDoProprietarioDB1)

            const res = await servicoImovel.getImoveisDoProprietario(proprietarioDB.id)

            expect(res).toEqual({
                id: proprietarioDB.id,
                nome: 'Ana1',
                tel: '123',
                email: 'ana@gmail.com',
                imoveis: [{
                    cidade: 'Rio de Janeiro',
                    bairro: 'Botafogo',
                    endereco: 'Rua 4, n 5',
                    valor_aluguel: 2500.00,
                    valor_venda: 4000000.00,
                }, {
                    cidade: 'Rio de Janeiro1',
                    bairro: 'Botafogo',
                    endereco: 'Rua 4, n 5',
                    valor_aluguel: 2500.00,
                    valor_venda: 5000000.00,
                }]
            })
        })
    })

    describe('get', () => {
        it('Deve retornar um imovel no banco de dados', async () => {
            const repositorioImoveisDoProprietario = dataSource.getRepository(ImoveisDoProprietarioDB)
            const repositorioProprietario = dataSource.getRepository(ProprietariosDB)
            const servicoProprietario = new ServicoProprietario(repositorioProprietario, repositorioImoveisDoProprietario)
            const repositorioImovel = dataSource.getRepository(ImoveisDB)
            const servicoImovel = new ServicoImovel(repositorioImovel, repositorioImoveisDoProprietario, servicoProprietario)

            await repositorioImovel.query(`delete from imoveis`)

            const imovelDB = new ImoveisDB()
            imovelDB.cidade = 'Rio de Janeiro'
            imovelDB.bairro = 'Botafogo'
            imovelDB.endereco = 'Rua 4, n 5'
            imovelDB.valor_aluguel = 2500.00
            imovelDB.valor_venda = 4000000.00
            imovelDB.ativo = true
            await repositorioImovel.save(imovelDB)

            const res = await servicoImovel.get(imovelDB.id)

            expect(res).toEqual({
                id: imovelDB.id,
                cidade: 'Rio de Janeiro',
                bairro: 'Botafogo',
                endereco: 'Rua 4, n 5',
                valor_aluguel: 2500.00,
                valor_venda: 4000000.00,
                ativo: true
            })
        })
    })

    describe('getImovelProprietario', () => {
        it('Deve retornar o imovel com as informações do prorprietario', async () => {
            const repositorioImoveisDoProprietario = dataSource.getRepository(ImoveisDoProprietarioDB)
            const repositorioProprietario = dataSource.getRepository(ProprietariosDB)
            const servicoProprietario = new ServicoProprietario(repositorioProprietario, repositorioImoveisDoProprietario)
            const repositorioImovel = dataSource.getRepository(ImoveisDB)
            const servicoImovel = new ServicoImovel(repositorioImovel, repositorioImoveisDoProprietario, servicoProprietario)

            await repositorioImovel.query(`delete from imoveis`)

            const proprietarioDB = new ProprietariosDB()
            proprietarioDB.nome = 'Ana'
            proprietarioDB.tel = '123'
            proprietarioDB.email = 'ana@gmail.com'
            await repositorioProprietario.save(proprietarioDB)

            const imovelDB = new ImoveisDB()
            imovelDB.cidade = 'Rio de Janeiro'
            imovelDB.bairro = 'Botafogo'
            imovelDB.endereco = 'Rua 4, n 5'
            imovelDB.valor_aluguel = 2500.00
            imovelDB.valor_venda = 4000000.00
            imovelDB.ativo = true
            await repositorioImovel.save(imovelDB)

            const imoveisDoProprietarioDB = new ImoveisDoProprietarioDB()
            imoveisDoProprietarioDB.imovel_id = imovelDB.id
            imoveisDoProprietarioDB.proprietario_id = proprietarioDB.id
            await repositorioImoveisDoProprietario.save(imoveisDoProprietarioDB)

            const imoveis = await servicoImovel.getImovelProprietario(imovelDB.id)

            expect(imoveis).toEqual({
                id: imovelDB.id,
                cidade: 'Rio de Janeiro',
                bairro: 'Botafogo',
                endereco: 'Rua 4, n 5',
                valor_aluguel: 2500.00,
                valor_venda: 4000000.00,
                ativo: true,
                proprietario_nome: 'Ana',
                proprietario_tel: '123',
                proprietario_email: 'ana@gmail.com'
            })
        })
    })

    describe('create', () => {
        it('Deve criar um imovel no banco', async () => {
            const repositorioImoveisDoProprietario = dataSource.getRepository(ImoveisDoProprietarioDB)
            const repositorioProprietario = dataSource.getRepository(ProprietariosDB)
            const servicoProprietario = new ServicoProprietario(repositorioProprietario, repositorioImoveisDoProprietario)
            const repositorioImovel = dataSource.getRepository(ImoveisDB)
            const servicoImovel = new ServicoImovel(repositorioImovel, repositorioImoveisDoProprietario, servicoProprietario)

            await repositorioImovel.query(`delete from imoveis`)

            const proprietarioDB = new ProprietariosDB()
            proprietarioDB.nome = 'Ana'
            proprietarioDB.tel = '123'
            proprietarioDB.email = 'ana@gmail.com'
            await repositorioProprietario.save(proprietarioDB)

            const idImovel = await servicoImovel.create(
                'Rio de Janeiro',
                'Botafogo',
                'Rua 4, n 5',
                2500.00,
                4000000.00,
                true,
                proprietarioDB.id
            )

            const res = await repositorioImovel.findOne({
                where: {
                    id: idImovel
                }
            })

            const res2 = await repositorioImoveisDoProprietario.findOne({
                where: {
                    id: idImovel
                }
            })

            expect(res).toEqual({
                id: idImovel,
                cidade: 'Rio de Janeiro',
                bairro: 'Botafogo',
                endereco: 'Rua 4, n 5',
                valor_aluguel: 2500.00,
                valor_venda: 4000000.00,
                ativo: true
            })

            expect(res2).toEqual({
                imovel_id: idImovel,
                proprietario_id: proprietarioDB.id
            })
        })
    })

    describe('update', () => {
        it('Deve alterar um imovel no banco', async () => {
            const repositorioImoveisDoProprietario = dataSource.getRepository(ImoveisDoProprietarioDB)
            const repositorioProprietario = dataSource.getRepository(ProprietariosDB)
            const servicoProprietario = new ServicoProprietario(repositorioProprietario, repositorioImoveisDoProprietario)
            const repositorioImovel = dataSource.getRepository(ImoveisDB)
            const servicoImovel = new ServicoImovel(repositorioImovel, repositorioImoveisDoProprietario, servicoProprietario)

            await repositorioImovel.query(`delete from imoveis`)

            const proprietarioDB = new ProprietariosDB()
            proprietarioDB.nome = 'Ana'
            proprietarioDB.tel = '123'
            proprietarioDB.email = 'ana@gmail.com'
            await repositorioProprietario.save(proprietarioDB)

            const imovelDB = new ImoveisDB()
            imovelDB.cidade = 'Rio de Janeiro'
            imovelDB.bairro = 'Botafogo'
            imovelDB.endereco = 'Rua 4, n 5'
            imovelDB.valor_aluguel = 2500.00
            imovelDB.valor_venda = 4000000.00
            imovelDB.ativo = true
            await repositorioImovel.save(imovelDB)

            const imoveisDoProprietarioDB = new ImoveisDoProprietarioDB()
            imoveisDoProprietarioDB.imovel_id = imovelDB.id
            imoveisDoProprietarioDB.proprietario_id = proprietarioDB.id
            await repositorioImoveisDoProprietario.save(imoveisDoProprietarioDB)

            await servicoImovel.update(
                imovelDB.id,
                'Rio de Janeiro1',
                'Botafogo',
                'Rua 4, n 5',
                2500.00,
                2000000.00,
                proprietarioDB.id
            )

            const res = await repositorioImovel.findOne({
                where: {
                    id: imovelDB.id
                }
            })

            const res2 = await repositorioImoveisDoProprietario.findOne({
                where: {
                    id: imovelDB.id
                }
            })

            expect(res).toEqual({
                id: imovelDB.id,
                cidade: 'Rio de Janeiro1',
                bairro: 'Botafogo',
                endereco: 'Rua 4, n 5',
                valor_aluguel: 2500.00,
                valor_venda: 2000000.00,
                ativo: true
            })

            expect(res2).toEqual({
                imovel_id: imovelDB.id,
                proprietario_id: proprietarioDB.id
            })
        })
    })

    describe('ativar', () => {
        it('Deve ativar um imovel desativado no banco', async () => {
            const repositorioImoveisDoProprietario = dataSource.getRepository(ImoveisDoProprietarioDB)
            const repositorioProprietario = dataSource.getRepository(ProprietariosDB)
            const servicoProprietario = new ServicoProprietario(repositorioProprietario, repositorioImoveisDoProprietario)
            const repositorioImovel = dataSource.getRepository(ImoveisDB)
            const servicoImovel = new ServicoImovel(repositorioImovel, repositorioImoveisDoProprietario, servicoProprietario)

            await repositorioImovel.query(`delete from imoveis`)

            const imovelDB = new ImoveisDB()
            imovelDB.cidade = 'Rio de Janeiro'
            imovelDB.bairro = 'Botafogo'
            imovelDB.endereco = 'Rua 4, n 5'
            imovelDB.valor_aluguel = 2500.00
            imovelDB.valor_venda = 4000000.00
            imovelDB.ativo = false
            await repositorioImovel.save(imovelDB)

            await servicoImovel.ativar(imovelDB.id)

            const res = await repositorioImovel.findOne({
                where: {
                    id: imovelDB.id
                }
            })

            expect(res).toEqual({
                id: imovelDB.id,
                cidade: 'Rio de Janeiro',
                bairro: 'Botafogo',
                endereco: 'Rua 4, n 5',
                valor_aluguel: 2500.00,
                valor_venda: 4000000.00,
                ativo: true
            })

        })
    })

    describe('desativar', () => {
        it('Deve desativar um imovel ativo no banco', async () => {
            const repositorioImoveisDoProprietario = dataSource.getRepository(ImoveisDoProprietarioDB)
            const repositorioProprietario = dataSource.getRepository(ProprietariosDB)
            const servicoProprietario = new ServicoProprietario(repositorioProprietario, repositorioImoveisDoProprietario)
            const repositorioImovel = dataSource.getRepository(ImoveisDB)
            const servicoImovel = new ServicoImovel(repositorioImovel, repositorioImoveisDoProprietario, servicoProprietario)

            await repositorioImovel.query(`delete from imoveis`)

            const imovelDB = new ImoveisDB()
            imovelDB.cidade = 'Rio de Janeiro'
            imovelDB.bairro = 'Botafogo'
            imovelDB.endereco = 'Rua 4, n 5'
            imovelDB.valor_aluguel = 2500.00
            imovelDB.valor_venda = 4000000.00
            imovelDB.ativo = true
            await repositorioImovel.save(imovelDB)

            await servicoImovel.desativar(imovelDB.id)

            const res = await repositorioImovel.findOne({
                where: {
                    id: imovelDB.id
                }
            })

            expect(res).toEqual({
                id: imovelDB.id,
                cidade: 'Rio de Janeiro',
                bairro: 'Botafogo',
                endereco: 'Rua 4, n 5',
                valor_aluguel: 2500.00,
                valor_venda: 4000000.00,
                ativo: false
            })

        })
    })
})