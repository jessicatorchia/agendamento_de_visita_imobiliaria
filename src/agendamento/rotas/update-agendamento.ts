import { ServicoAgendamento } from "../servico/agendamento";
import { Express } from 'express'

export const updateAgendamento = (site: Express, servico: ServicoAgendamento)=>{
    site.post('/agendamento/:id', async(req, res)=>{
        try{
            await servico.update(
                Number(req.params.id),
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