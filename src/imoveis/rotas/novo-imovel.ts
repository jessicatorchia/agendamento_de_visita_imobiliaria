import { Express } from 'express'
import { ServicoImovel } from '../servico/imoveis'
import { ServicoProprietario } from '../../proprietario/servico/proprietario'

export const novoImovel = (site: Express, servico: ServicoImovel, servicoProprietario: ServicoProprietario)=>{
    site.get('/imovel-novo', async(req, res)=>{
        
        const proprietarios = await servicoProprietario.listar()
        let selectProprietario = '<select name="proprietario_id">'
        proprietarios.forEach(proprietario=>{
            selectProprietario += `<option value="${proprietario.id}">${proprietario.nome}</option>`
        })
        selectProprietario += '</select>'

        res.send(`
        <form action="/imovel" method="post">
        <label>Cidade:</label><input name="cidade"><br />
        <label>Bairro:</label><input name="bairro"><br />
        <label>Endereço:</label><input name="endereco"><br />
        <label>Valor Alugel:</label><input type="number" name="valor_alugel"><br />
        <label>Valor Venda:</label><input type="number" name="valor_venda"><br />
        <label>Ativo:</label><input type="checkbox" name="ativo" value="true"><br />
        <label>Proprietário:</label>${selectProprietario}<br />
        
        <button>Enviar</button>
        </form>
        <br/>
        <a href="imovel">Voltar</a>
        `)
    })
}