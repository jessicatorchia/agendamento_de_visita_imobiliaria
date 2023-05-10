import { Express } from 'express'
import { ServicoImovel } from '../servico/imoveis';

export const desativarImovel = (site: Express, servico: ServicoImovel)=>{
    site.put('/imovel/desativar/:id', async(req, res)=>{
        try{
            await servico.desativar(
                Number(req.params.id))
            res.send()
        }catch(erro){
            console.error(erro)
            res.status(500)
            res.send(erro.message)
        }
    })
}