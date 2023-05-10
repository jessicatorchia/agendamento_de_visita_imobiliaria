import { Express } from 'express'
import { ServicoImovel } from '../servico/imoveis';

export const listarImovel = (site: Express, servico: ServicoImovel)=>{
    site.get('/imovel', async(req, res)=>{
        try{
            const imoveis = await servico.listar()
            
            res.send(imoveis)
        }catch(erro){
            console.error(erro)
            res.status(500)
            res.send(erro.message)
        }
    })
}