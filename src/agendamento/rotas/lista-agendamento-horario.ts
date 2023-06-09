import { ServicoAgendamento } from "../servico/agendamento";
import { Express } from 'express'

export const listaAgendamentoPorHorario = (site: Express, servico: ServicoAgendamento)=>{
    site.get('/agendamento-data-hora/:data_hora', async(req, res)=>{
        try{
            const dataHora = new Date(req.params.data_hora);
            if (isNaN(dataHora.getTime())) {
            throw new Error('Formato de data inválido');
        }
            
            const agendamentos = await servico.listaAgendamentosPorHorario(new Date(req.params.data_hora))

            let html = `
           
            <table>
            <tr>
                <th>Nome Cliente</th>
                <th>Telefone Cliente</th>
                <th>Nome Corretor</th>
                <th>Telefone Corretor</th>
                <th>Cidade</th>
                <th>Bairro</th>
                <th>Endereço</th>
                <th>Valor Venda</th>
                <th>Valor Aluguel</th>
            </tr>`
            
            agendamentos.agendamentos.forEach(agendamento => {
                html += `
                <tr>
                    <td>${agendamento.cliente_nome}</td>
                    <td>${agendamento.cliente_tel}</td>
                    <td>${agendamento.corretor}</td>
                    <td>${agendamento.corretor_tel}</td>
                    <td>${agendamento.cidade}</td>
                    <td>${agendamento.bairro}</td>
                    <td>${agendamento.endereco}</td>
                    <td>${agendamento.valor_venda}</td>
                    <td>${agendamento.valor_aluguel}</td>
                <tr>`
            });
            html += `
            </table>`
            res.send(html)
        }catch(erro){
            console.error(erro)
            res.status(500)
            res.send(erro.message)
        }
    })
}