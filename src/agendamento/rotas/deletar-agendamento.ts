import { ServicoAgendamento } from "../servico/agendamento";
import { Express } from 'express'

export const deletarAgendamentoCliente = (site: Express, servico: ServicoAgendamento)=>{
    site.get('/agendamento-delete/:id', async(req, res)=>{
        try{
            await servico.deletar(Number(req.params.id))
           
            res.send(`
            Agendamento deletado
            <br/>
            <a href="agendamento">Voltar</a>
            `)
        }catch(erro){
            console.error(erro)
            res.status(500)
            res.send(erro.message)
        }
    })
}