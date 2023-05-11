import 'reflect-metadata'
import express from 'express'
import bodyParser from 'body-parser'
import { AppDataSource } from './data-source'
import AgendamentosDB from './entity/agendamentos'
import { ServicoCliente } from './cliente/servico/cliente'
import { ServicoCorretor } from './corretor/servico/corretor'
import { ServicoImovel } from './imoveis/servico/imoveis'
import ClientesDB from './entity/clientes'
import ImoveisDB from './entity/imoveis'
import CorretoresDB from './entity/corretores'
import { ServicoAgendamento } from './agendamento/servico/agendamento'
import { create } from 'domain'
import ProprietariosDB from './entity/proprietarios'
import ImoveisDoProprietarioDB from './entity/imoveis_do_proprietario'
import { ServicoProprietario } from './proprietario/servico/proprietario'
import { getAgendamentoCliente } from './agendamento/rotas/get-agendamento-cliente'
import { createAgendamento } from './agendamento/rotas/create-agendamento'
import { updateAgendamento } from './agendamento/rotas/update-agendamento'
import { deletarAgendamentoCliente } from './agendamento/rotas/deletar-agendamento'
import { createCliente } from './cliente/rotas/create-cliente'
import { updateCliente } from './cliente/rotas/update-cliente'
import { listarCliente } from './cliente/rotas/listar-cliente'
import { getCliente } from './cliente/rotas/get-cliente'
import { createCorretor } from './corretor/rotas/create-corretor'
import { updateCorretor } from './corretor/rotas/update-corretor'
import { listarCorretor } from './corretor/rotas/listar-corretores'
import { getCorretor } from './corretor/rotas/get-corretor'
import { ativarCorretor } from './corretor/rotas/ativar-corretor'
import { desativarCorretor } from './corretor/rotas/desativar-corretor'
import { createProprietario } from './proprietario/rotas/create-proprietario'
import { updateProprietario } from './proprietario/rotas/update-proprietario'
import { listarProprietario } from './proprietario/rotas/listar-proprietarios'
import { getProprietario } from './proprietario/rotas/get-proprietario'
import { ativarImovel } from './imoveis/rotas/ativar-imovel'
import { desativarImovel } from './imoveis/rotas/desativar-imovel'
import { createImovel } from './imoveis/rotas/create-imovel'
import { getImoveisDoProprietario } from './imoveis/rotas/get-imoveis-do-proprietario'
import { getImovelProprietario } from './imoveis/rotas/get-imovel-proprietario'
import { getImovel } from './imoveis/rotas/get-imovel'
import { listarImovel } from './imoveis/rotas/listar-imoveis'
import { updateImovel } from './imoveis/rotas/update-imovel'
import { listaAgendamentoPorHorario } from './agendamento/rotas/lista-agendamento-horario'



export async function createServer() {
    const site = express()                      
    site.use(bodyParser.json())    
    const port = 3000  

    const dataSource = await AppDataSource.initialize()

    

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
    const servicoAgendamento = new ServicoAgendamento(repositorioAgendamento,  servicoImovel, servicoCliente,servicoCorretor)

    
    getAgendamentoCliente(site, servicoAgendamento)
    createAgendamento(site, servicoAgendamento)
    updateAgendamento(site, servicoAgendamento)
    deletarAgendamentoCliente(site, servicoAgendamento)
    listaAgendamentoPorHorario(site, servicoAgendamento)

    createCliente(site, servicoCliente)
    updateCliente(site, servicoCliente)
    listarCliente(site, servicoCliente)
    getCliente(site, servicoCliente)

    createCorretor(site, servicoCorretor)
    updateCorretor(site, servicoCorretor)
    listarCorretor(site, servicoCorretor)
    getCorretor(site, servicoCorretor)
    ativarCorretor(site, servicoCorretor)
    desativarCorretor(site, servicoCorretor)

    createProprietario(site, servicoProprietario)
    updateProprietario(site, servicoProprietario)
    listarProprietario(site, servicoProprietario)
    getProprietario(site, servicoProprietario)

    ativarImovel(site, servicoImovel)
    desativarImovel(site, servicoImovel)
    createImovel(site, servicoImovel)
    getImoveisDoProprietario(site, servicoImovel)
    getImovelProprietario(site, servicoImovel)
    getImovel(site, servicoImovel)
    listarImovel(site, servicoImovel)
    updateImovel(site, servicoImovel)





    const server = site.listen(port, () =>{
        console.log(`Example app listening on port ${port}`)
    })

    return { site, server }
}