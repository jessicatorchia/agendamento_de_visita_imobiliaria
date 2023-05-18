import { Express } from 'express'
import { ServicoCliente } from "../servico/cliente";

export const updateCliente = (site: Express, servico: ServicoCliente)=>{
    site.get('/cliente-update/:id', async(req, res)=>{
        try{
            await servico.update(
                Number(req.params.id),
                req.body.nome,
                req.body.tel,
                req.body.email
            )
            res.send(`cliente alterado com sucesso
            <br/>
            <a href="/cliente">Voltar</a>
            `)
        }catch(erro){
            console.error(erro)
            res.status(500)
            res.send(erro.message)
        }
    })
} 