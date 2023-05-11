import { ServicoAgendamento } from "../servico/agendamento";
import { Express } from 'express'

export const listaAgendamentoPorHorario = (site: Express, servico: ServicoAgendamento)=>{
    site.get('/agendamento-data-hora/:data_hora', async(req, res)=>{
        try{
            const agendamentos = await servico.getAgendamentoCliente(Number(req.params.data_hora))
            res.send(agendamentos)
        }catch(erro){
            console.error(erro)
            res.status(500)
            res.send(erro.message)
        }
    })
}