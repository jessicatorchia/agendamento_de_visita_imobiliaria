import dayjs from "dayjs"
import { ServicoCliente } from "../../cliente/servico/cliente"
import { ServicoCorretor } from "../../corretor/servico/corretor"
import { AppDataSource } from "../../data-source"
import AgendamentosDB from "../../entity/agendamentos"
import ClientesDB from "../../entity/clientes"
import CorretoresDB from "../../entity/corretores"
import ImoveisDB from "../../entity/imoveis"
import ImoveisDoProprietarioDB from "../../entity/imoveis_do_proprietario"
import ProprietariosDB from "../../entity/proprietarios"
import { ServicoImovel } from "../../imoveis/servico/imoveis"
import { ServicoProprietario } from "../../proprietario/servico/proprietario"
import { ServicoAgendamento } from "./agendamento"


let dataSource

describe('ServicoAgendamento', () => {
    beforeAll(async () => {
        dataSource = await AppDataSource.initialize()
    })
    describe('getAgendamentoCliente', () => {
        it('Deve retornar um agendamento com informações do cliente, corretor e imovel', async () => {

            const repositorioCliente = dataSource.getRepository(ClientesDB)
            const servicoCliente = new ServicoCliente(repositorioCliente)

            const repositorioCorretor = dataSource.getRepository(CorretoresDB)
            const servicoCorretor = new ServicoCorretor(repositorioCorretor)

            const repositorioImoveisDoProprietario = dataSource.getRepository(ImoveisDoProprietarioDB)

            const repositorioProprietario = dataSource.getRepository(ProprietariosDB)
            const servicoProprietario = new ServicoProprietario(repositorioProprietario, repositorioImoveisDoProprietario)

            const repositorioImovel = dataSource.getRepository(ImoveisDB)
            const servicoImovel = new ServicoImovel(repositorioImovel, repositorioImoveisDoProprietario, servicoProprietario)

            const repositorioAgendamento = dataSource.getRepository(AgendamentosDB)
            const servicoAgendamento = new ServicoAgendamento(repositorioAgendamento, servicoImovel, servicoCliente, servicoCorretor)

            const clienteDB = new ClientesDB()
            clienteDB.nome = 'Ana'
            clienteDB.tel = '123'
            clienteDB.email = 'ana@gmail.com'
            await repositorioCliente.save(clienteDB)

            const corretorDB = new CorretoresDB()
            corretorDB.nome = 'beto'
            corretorDB.tel = '123'
            corretorDB.email = 'beto@gmail.com'
            corretorDB.ativo = true
            await repositorioCorretor.save(corretorDB)

            const imovelDB = new ImoveisDB()
            imovelDB.cidade = 'Rio de Janeiro'
            imovelDB.bairro = 'Botafogo'
            imovelDB.endereco = 'Rua 4, n 5'
            imovelDB.valor_venda = 4000000.00
            imovelDB.valor_aluguel = 2500.00
            imovelDB.ativo = true
            await repositorioImovel.save(imovelDB)

            const agendamentoDB = new AgendamentosDB()
            agendamentoDB.data_hora = dayjs('2023-01-05').hour(0).minute(0).second(0).millisecond(0).toDate()
            agendamentoDB.imovel_id = imovelDB.id
            agendamentoDB.cliente_id = clienteDB.id
            agendamentoDB.corretor_id = corretorDB.id
            await repositorioAgendamento.save(agendamentoDB)

            const agendamento = await servicoAgendamento.getAgendamentoCliente(agendamentoDB.id)

            expect(agendamento).toEqual({
                id: agendamentoDB.id,
                data_hora: dayjs('2023-01-05').hour(0).minute(0).second(0).millisecond(0).toDate(),
                cliente_nome: 'Ana',
                cliente_tel:'123',
                corretor: 'beto',
                corretor_tel: '123',
                cidade: 'Rio de Janeiro',
                bairro: 'Botafogo',
                endereco:'Rua 4, n 5',
                valor_venda: 4000000.00,
                valor_aluguel:  2500.00
            })
        })
    })

    describe('create', () => {
        it('Deve criar um agendamento', async () => {

            const repositorioCliente = dataSource.getRepository(ClientesDB)
            const servicoCliente = new ServicoCliente(repositorioCliente)

            const repositorioCorretor = dataSource.getRepository(CorretoresDB)
            const servicoCorretor = new ServicoCorretor(repositorioCorretor)

            const repositorioImoveisDoProprietario = dataSource.getRepository(ImoveisDoProprietarioDB)

            const repositorioProprietario = dataSource.getRepository(ProprietariosDB)
            const servicoProprietario = new ServicoProprietario(repositorioProprietario, repositorioImoveisDoProprietario)

            const repositorioImovel = dataSource.getRepository(ImoveisDB)
            const servicoImovel = new ServicoImovel(repositorioImovel, repositorioImoveisDoProprietario, servicoProprietario)

            const repositorioAgendamento = dataSource.getRepository(AgendamentosDB)
            const servicoAgendamento = new ServicoAgendamento(repositorioAgendamento, servicoImovel, servicoCliente, servicoCorretor)

            await repositorioAgendamento.query(`delete from agendamentos`)            
            await repositorioCliente.query(`delete from clientes`)
            await repositorioCorretor.query(`delete from corretores`)
            await repositorioImovel.query(`delete from imoveis`)
            
            

            const clienteDB = new ClientesDB()
            clienteDB.nome = 'Ana'
            clienteDB.tel = '123'
            clienteDB.email = 'ana@gmail.com'
            await repositorioCliente.save(clienteDB)

            const corretorDB = new CorretoresDB()
            corretorDB.nome = 'beto'
            corretorDB.tel = '123'
            corretorDB.email = 'beto@gmail.com'
            corretorDB.ativo = true
            await repositorioCorretor.save(corretorDB)

            const imovelDB = new ImoveisDB()
            imovelDB.cidade = 'Rio de Janeiro'
            imovelDB.bairro = 'Botafogo'
            imovelDB.endereco = 'Rua 4, n 5'
            imovelDB.valor_venda = 4000000.00
            imovelDB.valor_aluguel = 2500.00
            imovelDB.ativo = true
            await repositorioImovel.save(imovelDB)

            
            const idAgendamento = await servicoAgendamento.create(
                dayjs('2023-01-05').hour(0).minute(0).second(0).millisecond(0).toDate(),
                imovelDB.id, 
                clienteDB.id, 
                corretorDB.id
            )

            const agendamento = await repositorioAgendamento.findOne({
                where:{
                    id: idAgendamento
                }
            })

            expect(agendamento).toEqual({
                id:idAgendamento,
                data_hora: dayjs('2023-01-05').hour(0).minute(0).second(0).millisecond(0).toDate(),
                imovel_id: imovelDB.id,
                cliente_id: clienteDB.id,
                corretor_id: corretorDB.id
            })
        })
    })

    describe('update', () => {
        it('Deve alterar um agendamento', async () => {

            const repositorioCliente = dataSource.getRepository(ClientesDB)
            const servicoCliente = new ServicoCliente(repositorioCliente)

            const repositorioCorretor = dataSource.getRepository(CorretoresDB)
            const servicoCorretor = new ServicoCorretor(repositorioCorretor)

            const repositorioImoveisDoProprietario = dataSource.getRepository(ImoveisDoProprietarioDB)

            const repositorioProprietario = dataSource.getRepository(ProprietariosDB)
            const servicoProprietario = new ServicoProprietario(repositorioProprietario, repositorioImoveisDoProprietario)

            const repositorioImovel = dataSource.getRepository(ImoveisDB)
            const servicoImovel = new ServicoImovel(repositorioImovel, repositorioImoveisDoProprietario, servicoProprietario)

            const repositorioAgendamento = dataSource.getRepository(AgendamentosDB)
            const servicoAgendamento = new ServicoAgendamento(repositorioAgendamento, servicoImovel, servicoCliente, servicoCorretor)

            await repositorioAgendamento.query(`delete from agendamentos`)
            await repositorioCliente.query(`delete from clientes`)
            await repositorioCorretor.query(`delete from corretores`)
            await repositorioImovel.query(`delete from imoveis`)
            

            const clienteDB = new ClientesDB()
            clienteDB.nome = 'Ana'
            clienteDB.tel = '123'
            clienteDB.email = 'ana@gmail.com'
            await repositorioCliente.save(clienteDB)

            const corretorDB = new CorretoresDB()
            corretorDB.nome = 'beto'
            corretorDB.tel = '123'
            corretorDB.email = 'beto@gmail.com'
            corretorDB.ativo = true
            await repositorioCorretor.save(corretorDB)

            const imovelDB = new ImoveisDB()
            imovelDB.cidade = 'Rio de Janeiro'
            imovelDB.bairro = 'Botafogo'
            imovelDB.endereco = 'Rua 4, n 5'
            imovelDB.valor_venda = 4000000.00
            imovelDB.valor_aluguel = 2500.00
            imovelDB.ativo = true
            await repositorioImovel.save(imovelDB)

            const agendamentoDB = new AgendamentosDB()
            agendamentoDB.data_hora = dayjs('2023-01-05').hour(0).minute(0).second(0).millisecond(0).toDate()
            agendamentoDB.imovel_id = imovelDB.id
            agendamentoDB.cliente_id = clienteDB.id
            agendamentoDB.corretor_id = corretorDB.id
            await repositorioAgendamento.save(agendamentoDB)
            
            await servicoAgendamento.update(
                agendamentoDB.id,
                dayjs('2023-01-06').hour(0).minute(0).second(0).millisecond(0).toDate(),
                imovelDB.id, 
                clienteDB.id, 
                corretorDB.id
            )

            const res = await repositorioAgendamento.findOne({
                where:{
                    id: agendamentoDB.id
                }
            })

            expect(res).toEqual({
                id:agendamentoDB.id,
                data_hora: dayjs('2023-01-06').hour(0).minute(0).second(0).millisecond(0).toDate(),
                imovel_id: imovelDB.id,
                cliente_id: clienteDB.id,
                corretor_id: corretorDB.id
            })
        })
    })

    describe('delete', () => {
        it('Deve deletar um agendamento', async () => {

            const repositorioCliente = dataSource.getRepository(ClientesDB)
            const servicoCliente = new ServicoCliente(repositorioCliente)

            const repositorioCorretor = dataSource.getRepository(CorretoresDB)
            const servicoCorretor = new ServicoCorretor(repositorioCorretor)

            const repositorioImoveisDoProprietario = dataSource.getRepository(ImoveisDoProprietarioDB)

            const repositorioProprietario = dataSource.getRepository(ProprietariosDB)
            const servicoProprietario = new ServicoProprietario(repositorioProprietario, repositorioImoveisDoProprietario)

            const repositorioImovel = dataSource.getRepository(ImoveisDB)
            const servicoImovel = new ServicoImovel(repositorioImovel, repositorioImoveisDoProprietario, servicoProprietario)

            const repositorioAgendamento = dataSource.getRepository(AgendamentosDB)
            const servicoAgendamento = new ServicoAgendamento(repositorioAgendamento, servicoImovel, servicoCliente, servicoCorretor)

            const clienteDB = new ClientesDB()
            clienteDB.nome = 'Ana'
            clienteDB.tel = '123'
            clienteDB.email = 'ana@gmail.com'
            await repositorioCliente.save(clienteDB)

            const corretorDB = new CorretoresDB()
            corretorDB.nome = 'beto'
            corretorDB.tel = '123'
            corretorDB.email = 'beto@gmail.com'
            corretorDB.ativo = true
            await repositorioCorretor.save(corretorDB)

            const imovelDB = new ImoveisDB()
            imovelDB.cidade = 'Rio de Janeiro'
            imovelDB.bairro = 'Botafogo'
            imovelDB.endereco = 'Rua 4, n 5'
            imovelDB.valor_venda = 4000000.00
            imovelDB.valor_aluguel = 2500.00
            imovelDB.ativo = true
            await repositorioImovel.save(imovelDB)

            const agendamentoDB = new AgendamentosDB()
            agendamentoDB.data_hora = dayjs('2023-01-05').hour(0).minute(0).second(0).millisecond(0).toDate()
            agendamentoDB.imovel_id = imovelDB.id
            agendamentoDB.cliente_id = clienteDB.id
            agendamentoDB.corretor_id = corretorDB.id
            await repositorioAgendamento.save(agendamentoDB)

            await servicoAgendamento.deletar(agendamentoDB.id)

            const res = await repositorioAgendamento.findOne({
                where:{
                    id: agendamentoDB.id
                }
            })

            expect(res).toBeNull()
        })
    })
})