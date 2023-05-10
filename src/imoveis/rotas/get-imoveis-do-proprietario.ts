import { Express } from 'express'
import { ServicoImovel } from '../servico/imoveis';

export const getImoveisDoProprietario = (site: Express, servico: ServicoImovel)=>{
    site.get('/imoveis/proprietario/:id', async(req, res)=>{
        try{
            const imoveis = await servico.getImoveisDoProprietario(Number(req.params.id))
            
            res.send(imoveis)
        }catch(erro){
            console.error(erro)
            res.status(500)
            res.send(erro.message)
        }
    })
}