import { Express } from 'express'
import { ServicoImovel } from '../servico/imoveis';

export const createImovel = (site: Express, servico: ServicoImovel)=>{
    site.post('/imovel', async(req, res)=>{
        try{
            await servico.create(
                req.body.cidade,
                req.body.bairro,
                req.body.endereco,
                req.body.valor_alugel,
                req.body.valor_venda,
                req.body.ativo,
                req.body.proprietario_id
            )
            res.send()
        }catch(erro){
            console.error(erro)
            res.status(500)
            res.send(erro.message)
        }
    })
}