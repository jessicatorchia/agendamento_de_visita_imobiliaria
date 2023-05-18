import { Express } from 'express'
import { ServicoImovel } from '../servico/imoveis';

export const getImovel = (site: Express, servico: ServicoImovel)=>{
    site.get('/imovel/:id', async(req, res)=>{
        try{
            const imovel = await servico.get(Number(req.params.id))
            
            const html = `
                <form action="/imovel/${imovel.id}" method="post">
                <b>Cidade:</b><input name="cidade" value="${imovel.cidade}"/><br>
                <b>Bairro:</b><input name="bairro" value="${imovel.bairro}"/><br>
                <b>Endereço:</b><input name="endereco" value="${imovel.endereco}"/><br>
                <b>Valor Aluguel:</b><input name="valor_aluguel" value="${imovel.valor_aluguel}"/><br>
                <b>Valor Venda:</b><input name="valor_venda" value="${imovel.valor_venda}"/><br>
                <b>Ativo:</b><input name="ativo" value="${imovel.ativo}"/><br>

                <button>Salvar Alterações</button>
                </form>
                `

            res.send(html)
        }catch(erro){
            console.error(erro)
            res.status(500)
            res.send(erro.message)
        }
    })
}