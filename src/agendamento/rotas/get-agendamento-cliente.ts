import { ServicoAgendamento } from "../servico/agendamento";
import { Express } from 'express'

export const getAgendamentoCliente = (site: Express, servico: ServicoAgendamento)=>{
    site.get('/agendamento/:id', async(req, res)=>{
        try{
            const agendamento = await servico.getAgendamentoCliente(Number(req.params.id))
            res.send(agendamento)
        }catch(erro){
            console.error(erro)
            res.status(500)
            res.send(erro.message)
        }
    })
}