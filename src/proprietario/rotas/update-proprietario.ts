import { Express } from 'express'
import { ServicoProprietario } from '../servico/proprietario';

export const updateProprietario = (site: Express, servico: ServicoProprietario)=>{
    site.put('/proprietario/:id', async(req, res)=>{
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