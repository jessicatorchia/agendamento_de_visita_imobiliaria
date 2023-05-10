import { Express } from 'express'
import { ServicoCorretor } from '../servico/corretor';

export const listarCorretor = (site: Express, servico: ServicoCorretor)=>{
    site.get('/corretor', async(req, res)=>{
        try{
            const corretores = await servico.listar()
            
            res.send(corretores)
        }catch(erro){
            console.error(erro)
            res.status(500)
            res.send(erro.message)
        }
    })
}