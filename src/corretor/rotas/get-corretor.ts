import { Express } from 'express'
import { ServicoCorretor } from '../servico/corretor';

export const getCorretor = (site: Express, servico: ServicoCorretor)=>{
    site.get('/corretor/:id', async(req, res)=>{
        try{
            const corretor= await servico.get(Number(req.params.id))
            
            res.send(corretor)
        }catch(erro){
            console.error(erro)
            res.status(500)
            res.send(erro.message)
        }
    })
}