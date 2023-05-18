import { ServicoAgendamento } from "../servico/agendamento";
import { Express } from 'express'

export const listarAgendamento= (site: Express, servico: ServicoAgendamento)=>{
    site.get('/agendamento', async(req, res)=>{
        try{
            const agendamentos = await servico.listar()

            let html = `
            <h3>Fazer Agendamento: </h3>
            <a href= "agendamento-novo">cadastrar novo agendamento</a>
            <table>
            <tr>
                <th>Id</th>
                <th>Data Hora</th>
                <th>Cliente Nome</th>
                <th>Cliente Telefone </th>
                <th>Corretor Nome </th>
                <th>Corretor Telefone</th>
                <th>Cidade</th>
                <th>Bairro</th>
                <th>Endereço</th>
                <th>Valor Venda</th>
                <th>Valor Aluguel</th> 
                <th>Ações</th>
            </tr>`
            
            agendamentos.forEach(agendamento => {
                html += `
                <tr>
                    <td>${agendamento.id}</td>
                    <td>${agendamento.data_hora}</td>
                    <td>${agendamento.cliente_nome}</td>
                    <td>${agendamento.cliente_tel}</td>
                    <td>${agendamento.corretor}</td>
                    <td>${agendamento.corretor_tel}</td>
                    <td>${agendamento.cidade}</td>
                    <td>${agendamento.bairro}</td>
                    <td>${agendamento.endereco}</td>
                    <td>${agendamento.valor_venda}</td>
                    <td>${agendamento.valor_aluguel}</td>
                    <td><a href="agendamento-delete/${agendamento.id}">deletar</a></td>
                    
                <tr>
                
                `
            });
            html += `
            <h3>Lista Agendamentos: <h3>
            </table>
            <br/>
            <a href="imobiliaria-home">Voltar</a>
            `
            res.send(html)
        }catch(erro){
            console.error(erro)
            res.status(500)
            res.send(erro.message)
        }
    })
}