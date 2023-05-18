import { Express } from 'express'
import { ServicoAgendamento } from '../servico/agendamento'
import { ServicoImovel } from '../../imoveis/servico/imoveis'
import { ServicoCliente } from '../../cliente/servico/cliente'
import { ServicoCorretor } from '../../corretor/servico/corretor'


export const novoAgendamento = (site: Express, servico: ServicoAgendamento, servicoImovel: ServicoImovel,
    servicoCliente: ServicoCliente, servicoCorretor: ServicoCorretor)=>{
    site.get('/agendamento-novo', async(req, res)=>{
        
        const imoveis = await servicoImovel.listar()
        let selectImovel = '<select name="imovel_id">'
        imoveis.forEach(imovel=> {
            selectImovel += `<option value="${imovel.id}">${imovel.endereco} ${imovel.cidade}</option>`
        })
        selectImovel += '</select>'

        const clientes = await servicoCliente.listar()
        let selectCliente = '<select name="cliente_id">'
        clientes.forEach(cliente =>{
            selectCliente += `<option value="${cliente.id}">${cliente.nome}</option>`
        })
        selectCliente +='</select>'

        const corretores = await servicoCorretor.listar()
        let selectCorretor = '<select name="corretor_id">'
        corretores.forEach(corretor =>{
            selectCorretor += `<option value="${corretor.id}">${corretor.nome}</option>`
        })
        selectCorretor +='</select>'

        res.send(`
        <form action="/agendamento" method="post">
        <label>Data_Hora:</label><input name="data_hora"><br />
        <label>Cliente:</label>${selectCliente}<br />
        <label>Corretor:</label>${selectCorretor}<br />
        <label>Imóvel:</label>${selectImovel}<br />
        
        <button>Enviar</button>
        </form>
        <br/>
        <a href="/agendamento">Voltar</a>
        `)
    })
}