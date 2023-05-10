import { Express } from 'express'
import { ServicoCliente } from "../servico/cliente";

export const updateCliente = (site: Express, servico: ServicoCliente)=>{
    site.put('/cliente/:id', async(req, res)=>{
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