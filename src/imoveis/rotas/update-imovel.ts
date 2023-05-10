import { Express } from 'express'
import { ServicoCorretor } from '../servico/corretor';

export const updateCorretor = (site: Express, servico: ServicoCorretor)=>{
    site.put('/corretor/:id', async(req, res)=>{
        try{
            await servico.update(
                Number(req.params.id),
                req.body.nome,
                req.body.tel,
                req.body.email
            )
            res.send()
        }catch(erro){
            console.error(erro)
            res.status(500)
            res.send(erro.message)
        }
    })
}