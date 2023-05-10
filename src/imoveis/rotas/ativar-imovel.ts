import { Express } from 'express'
import { ServicoImovel } from '../servico/imoveis';

export const ativarImovel = (site: Express, servico: ServicoImovel)=>{
    site.put('/imovel/ativar/:id', async(req, res)=>{
        try{
            await servico.ativar(
                Number(req.params.id))
            res.send()
        }catch(erro){
            console.error(erro)
            res.status(500)
            res.send(erro.message)
        }
    })
}