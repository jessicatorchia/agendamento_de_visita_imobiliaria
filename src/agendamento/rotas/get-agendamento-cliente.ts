import { ServicoAgendamento } from "../servico/agendamento";
import { Express } from 'express'

export const getAgendamentoCliente = (site: Express, servico: ServicoAgendamento)=>{
    site.get('/agendamento/:id', async(req, res)=>{
        try{
            const agendamento = await servico.getAgendamentoCliente(Number(req.params.id))
           
            const html = `
            
            <b>Nome Cliente:</b>${agendamento.cliente_nome}<br>
            <b>Telefone Cliente:</b>${agendamento.cliente_tel}<br>
            <b>Nome Corretor:</b>${agendamento.corretor}<br>
            <b>Telefone Corretor:</b>${agendamento.corretor_tel}<br>
            <b>Cidade:</b>${agendamento.cidade}<br>
            <b>Bairro:</b>${agendamento.bairro}<br>
            <b>Endereço:</b>${agendamento.endereco}<br>
            <b>Valor Venda:</b>${agendamento.valor_venda}<br>
            <b>Valor Aluguel:</b>${agendamento.valor_aluguel}<br>

          
            `
            res.send(html)
        }catch(erro){
            console.error(erro)
            res.status(500)
            res.send(erro.message)
        }
    })
}