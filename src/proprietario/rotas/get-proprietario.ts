import { Express } from 'express'
import { ServicoProprietario } from '../servico/proprietario';

export const getProprietario = (site: Express, servico: ServicoProprietario)=>{
    site.get('/proprietario/:id', async(req, res)=>{
        try{
            const proprietario = await servico.get(Number(req.params.id))
            
            res.send(proprietario)
        }catch(erro){
            console.error(erro)
            res.status(500)
            res.send(erro.message)
        }
    })
}