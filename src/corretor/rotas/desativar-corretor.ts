import { Express } from 'express'
import { ServicoCorretor } from '../servico/corretor';

export const desativarCorretor = (site: Express, servico: ServicoCorretor)=>{
    site.put('/corretor/desativar/:id', async(req, res)=>{
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