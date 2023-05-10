import { Express } from 'express'
import { ServicoCorretor } from '../servico/corretor';

export const createCorretor = (site: Express, servico: ServicoCorretor)=>{
    site.post('/corretor', async(req, res)=>{
        try{
            await servico.create(
                req.body.nome,
                req.body.tel,
                req.body.email,
                req.body.ativo
            )
            res.send()
        }catch(erro){
            console.error(erro)
            res.status(500)
            res.send(erro.message)
        }
    })
}