import { Express } from 'express'
import { ServicoImovel } from '../servico/imoveis';

export const listarImovel = (site: Express, servico: ServicoImovel)=>{
    site.get('/imovel', async(req, res)=>{
        try{
            const imoveis = await servico.listar()
            let html = `
            <h3>Cadastro de Imóvel: </h3>
            <a href="imovel-novo">cadastrar novo imóvel</a>
            <table>
            <tr>
                <th>id Imovel</th>
                <th>Cidade</th>
                <th>Bairro</th>
                <th>Endereço</th>
                <th>Valor Aluguel</th>
                <th>Valor Venda</th>
                <th>Ativo</th>
                <th>Ações</th>
            </tr>`
            
            imoveis.forEach(imovel =>{
                html += `
                
                <tr>
                    <td>${imovel.id}</td>
                    <td>${imovel.cidade}</td>
                    <td>${imovel.bairro}</td>
                    <td>${imovel.endereco}</td>
                    <td>${imovel.valor_aluguel}</td>
                    <td>${imovel.valor_venda}</td>
                    <td>${imovel.ativo}</td>
                    <td><a href="imovel/${imovel.id}">editar</a></td>
                </tr>
                `
            })
            html += `
            <h3>Lista Imóveis Cadastrados: </h3>
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