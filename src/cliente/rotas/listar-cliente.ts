import { Express } from 'express'
import { ServicoCliente } from "../servico/cliente";

export const listarCliente = (site: Express, servico: ServicoCliente)=>{
    site.get('/cliente', async(req, res)=>{
        try{
            const clientes = await servico.listar()        
            res.render('cliente/listar-cliente', {clientes: clientes})
        }catch(erro){
            console.error(erro)
            res.status(500)
            res.send(erro.message)
        }
    })
} 