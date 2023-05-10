import { Express } from 'express'
import { ServicoCorretor } from '../servico/corretor';

export const ativarCorretor = (site: Express, servico: ServicoCorretor)=>{
    site.put('/corretor/ativar/:id', async(req, res)=>{
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