import { Express } from 'express'
import { ServicoImovel } from '../servico/imoveis';

export const getImovel = (site: Express, servico: ServicoImovel)=>{
    site.get('/imovel/:id', async(req, res)=>{
        try{
            const imovel = await servico.get(Number(req.params.id))
            
            res.send(imovel)
        }catch(erro){
            console.error(erro)
            res.status(500)
            res.send(erro.message)
        }
    })
}