import { ServicoAgendamento } from "../servico/agendamento";
import { Express } from 'express'

export const deletarAgendamentoCliente = (site: Express, servico: ServicoAgendamento)=>{
    site.delete('/agendamento/:id', async(req, res)=>{
        try{
            await servico.deletar(Number(req.params.id))
            res.send()
        }catch(erro){
            console.error(erro)
            res.status(500)
            res.send(erro.message)
        }
    })
}