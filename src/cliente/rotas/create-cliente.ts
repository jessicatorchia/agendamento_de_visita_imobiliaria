import { Express } from 'express'
import { ServicoCliente } from "../servico/cliente";

export const createCliente = (site: Express, servico: ServicoCliente)=>{
    site.post('/cliente', async(req, res)=>{
        try{
            await servico.create(
                req.body.nome,
                req.body.tel,
                req.body.email
            )
            res.send('<b>cliente</b> cadastrado com sucesso')
        }catch(erro){
            console.error(erro)
            res.status(500)
            res.send(erro.message)
        }
    })
} 