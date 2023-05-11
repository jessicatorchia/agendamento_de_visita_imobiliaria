import { Express } from 'express'
import { ServicoImovel } from '../servico/imoveis';

export const updateImovel = (site: Express, servico: ServicoImovel)=>{
    site.put('/imovel/:id', async(req, res)=>{
        try{
            await servico.update(
                Number(req.params.id),
                req.body.cidade,
                req.body.bairro,
                req.body.endereco,
                req.body.valor_alugel,
                req.body.valor_venda,
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