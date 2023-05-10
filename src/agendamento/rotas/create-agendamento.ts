import { ServicoAgendamento } from "../servico/agendamento";
import { Express } from 'express'

export const createAgendamento = (site: Express, servico: ServicoAgendamento)=>{
    site.post('/agendamento', async(req, res)=>{
        try{
            await servico.create(
                req.body.data_hora,
                req.body.imovel_id,
                req.body.cliente_id,
                req.body.corretor_id
            )
            res.send()
        }catch(erro){
            console.error(erro)
            res.status(500)
            res.send(erro.message)
        }
    })
}