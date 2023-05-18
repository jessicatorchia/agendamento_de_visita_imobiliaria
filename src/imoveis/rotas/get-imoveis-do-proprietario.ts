import { Express } from 'express'
import { ServicoImovel } from '../servico/imoveis';

export const getImoveisDoProprietario = (site: Express, servico: ServicoImovel)=>{
    site.get('/imoveis/proprietario/:id', async(req, res)=>{
        try{
            const proprietario = await servico.getImoveisDoProprietario(Number(req.params.id))

            let html = `
            <b>Id:</b> ${proprietario.id}<br>
            <b>Nome proprietario:</b> ${proprietario.nome}<br>
            <b>Telefone:</b> ${proprietario.tel}<br>
            <b>Email:</b>${proprietario.email}<br>
            <br>
            `

            html += `<table>
            <tr>
                <th>Cidade</th>
                <th>Bairro</th>
                <th>Endereço</th>
                <th>Valor Aluguel</th>
                <th>Valor Venda</th>
            </tr>`

            proprietario.imoveis.forEach(imovel=> {
                html += `
                <tr>
                    <td>${imovel.cidade}</td>
                    <td>${imovel.bairro}</td>
                    <td>${imovel.endereco}</td>
                    <td>${imovel.valor_aluguel}</td>
                    <td>${imovel.valor_venda}</td>
                </td>
                `
            })
            html += '</table>'
            res.send(html)
        }catch(erro){
            console.error(erro)
            res.status(500)
            res.send(erro.message)
        }
    })
}