import { Express } from 'express'
import { ServicoCliente } from "../servico/cliente";

export const getCliente = (site: Express, servico: ServicoCliente)=>{
    site.get('/cliente/:id', async(req, res)=>{
        try{
            const cliente = await servico.get(Number(req.params.id))
            
            res.send(cliente)
        }catch(erro){
            console.error(erro)
            res.status(500)
            res.send(erro.message)
        }
    })
}