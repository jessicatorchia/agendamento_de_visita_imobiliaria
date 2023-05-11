import { And, LessThan, LessThanOrEqual, MoreThanOrEqual, Repository } from "typeorm";
import AgendamentosDB from "../../entity/agendamentos";
import { ServicoImovel } from "../../imoveis/servico/imoveis";
import { ServicoCliente } from "../../cliente/servico/cliente";
import { ServicoCorretor } from "../../corretor/servico/corretor";
import dayjs from "dayjs";


interface GetAgendamentoCliente {
    id: number,
    data_hora: Date,
    cliente_nome: string,
    cliente_tel: string,
    corretor: string,
    corretor_tel: string,
    cidade: string,
    bairro: string
    endereco: string,
    valor_venda: number,
    valor_aluguel: number
}

interface ClientesCorretoresEImovel{
    cliente_nome: string,
    cliente_tel: string,
    corretor: string,
    corretor_tel: string,
    cidade: string,
    bairro: string
    endereco: string,
    valor_venda: number,
    valor_aluguel: number
}

interface GetAgendamentoHorario {
    data_hora: Date,
    agendamentos: ClientesCorretoresEImovel[]
}

export class ServicoAgendamento {
    repositorioAgendamento: Repository<AgendamentosDB>
    servicoImovel: ServicoImovel
    servicoCliente: ServicoCliente
    servicoCorretor: ServicoCorretor

    constructor(repositorioAgendamento: Repository<AgendamentosDB>,
        servicoImovel: ServicoImovel,
        servicoCliente: ServicoCliente,
        servicoCorretor: ServicoCorretor
    ) {
        this.repositorioAgendamento = repositorioAgendamento
        this.servicoImovel = servicoImovel
        this.servicoCliente = servicoCliente
        this.servicoCorretor = servicoCorretor
    }

    async getAgendamentoCliente(id: number): Promise<GetAgendamentoCliente> {
        const agendamentoDB = await this.repositorioAgendamento.findOne({
            where: {
                id: id
            }
        })

        if (!agendamentoDB) {
            throw new Error('Agendamento não encontrado')
        }

        const imovelDB = await this.servicoImovel.get(agendamentoDB.imovel_id)

        const clienteDB = await this.servicoCliente.get(agendamentoDB.cliente_id)

        const corretorDB = await this.servicoCorretor.get(agendamentoDB.corretor_id)

        return {
            id: agendamentoDB.id,
            data_hora: agendamentoDB.data_hora,
            cliente_nome: clienteDB.nome,
            cliente_tel: clienteDB.tel,
            corretor: corretorDB.nome,
            corretor_tel: corretorDB.tel,
            cidade: imovelDB.cidade,
            bairro: imovelDB.bairro,
            endereco: imovelDB.endereco,
            valor_venda: imovelDB.valor_venda,
            valor_aluguel: imovelDB.valor_aluguel
        }
    }

    async listaAgendamentosPorHorario(data_hora: Date): Promise<GetAgendamentoHorario> {
        const comecoDoDia = dayjs(data_hora).set('hour', 0).set('minute', 0).set('second', 0).toDate()
        const fimDoDia = dayjs(data_hora).set('hour', 23).set('minute', 59).set('second', 59).toDate()
        const agendamentosDB = await this.repositorioAgendamento.find({
            where: {
                data_hora: And(MoreThanOrEqual(comecoDoDia), LessThanOrEqual(fimDoDia))
            }
        })

        if (!agendamentosDB) {
            throw new Error('data_hora do agendamento não encontrado')
        }

        const resposta: GetAgendamentoHorario = {
            data_hora: data_hora,
            agendamentos: []
        }

        await Promise.all(agendamentosDB.map(async agendamento => {
            const cliente = await this.servicoCliente.get(agendamento.cliente_id)
            const corretor = await this.servicoCorretor.get(agendamento.corretor_id)
            const imovel = await this.servicoImovel.get(agendamento.imovel_id)

            resposta.agendamentos.push({
                cliente_nome: cliente.nome,
                cliente_tel: cliente.tel,
                corretor: corretor.nome,
                corretor_tel: corretor.tel,
                cidade: imovel.cidade,
                bairro: imovel.bairro,
                endereco: imovel.endereco,
                valor_venda: imovel.valor_venda,
                valor_aluguel: imovel.valor_aluguel
            })
        }))
        return resposta
    }

    async create(data_hora: Date, imovel_id:number ,cliente_id: number, corretor_id:number): Promise<number>{
       
        const agendamentosDataHoraImovelDB = await this.repositorioAgendamento.find({
            where: {
                data_hora: data_hora,
                imovel_id: imovel_id,
            }
        })

        if(agendamentosDataHoraImovelDB[0]){
            throw new Error('Imovel indisponvel para a data e hora')
        }

        const agendamentosDataHoraCorretorDB = await this.repositorioAgendamento.find({
            where: {
                data_hora: data_hora,
                corretor_id: corretor_id
            }
        })
        
        if(agendamentosDataHoraCorretorDB[0]){
            throw new Error('Corretor indisponivel para a data e hora')
        }

        const imoveisDB = await this.servicoImovel.get(imovel_id)

        if(!imoveisDB){
            throw new Error('Imovel não encontrado')
        }

        const clienteDB = await this.servicoCliente.get(cliente_id)

        if(!clienteDB){
            throw new Error('Cliente não encontrado')
        }

        const corretorDB = await this.servicoCorretor.get(corretor_id)

        if(!corretorDB){
            throw new Error('Corretor não encontrado')
        }
        
        const agendamentoDB = new AgendamentosDB()
        agendamentoDB.data_hora = data_hora
        agendamentoDB.imovel_id = imovel_id
        agendamentoDB.cliente_id = cliente_id
        agendamentoDB.corretor_id = corretor_id
        await this.repositorioAgendamento.save(agendamentoDB)

        return agendamentoDB.id
    }

    async update(id:number, data_hora: Date, imovel_id:number ,cliente_id: number, 
        corretor_id:number): Promise<void>{

        const agendamentoDB = await this.repositorioAgendamento.findOne({
            where:{
                id:id
            }
        })

        if(!agendamentoDB){
            throw new Error('Agendamento nao encontrado')
        }
       
        const agendamentosDataHoraImovelDB = await this.repositorioAgendamento.find({
            where: {
                data_hora: data_hora,
                imovel_id: imovel_id,
            }
        })

        if(agendamentosDataHoraImovelDB[0]){
            throw new Error('Imovel indisponvel para a data e hora')
        }

        const agendamentosDataHoraCorretorDB = await this.repositorioAgendamento.find({
            where: {
                data_hora: data_hora,
                corretor_id: corretor_id
            }
        })
        
        if(agendamentosDataHoraCorretorDB[0]){
            throw new Error('Corretor indisponivel para a data e hora')
        }

        const imoveisDB = await this.servicoImovel.get(imovel_id)

        if(!imoveisDB){
            throw new Error('Imovel não encontrado')
        }

        const clienteDB = await this.servicoCliente.get(cliente_id)

        if(!clienteDB){
            throw new Error('Cliente não encontrado')
        }

        const corretorDB = await this.servicoCorretor.get(corretor_id)

        if(!corretorDB){
            throw new Error('Corretor não encontrado')
        }

        agendamentoDB.data_hora = data_hora
        agendamentoDB.imovel_id = imovel_id
        agendamentoDB.cliente_id = cliente_id
        agendamentoDB.corretor_id = corretor_id
        await this.repositorioAgendamento.save(agendamentoDB)

    }

    async deletar(id: number): Promise<void>{
        const agendamentoDB = await this.repositorioAgendamento.findOne({
            where:{
                id: id
            }
        })

        if(!agendamentoDB){
            throw new Error('Agendamento nao encontrado')
        }

        await this.repositorioAgendamento.delete(agendamentoDB)
    }
}