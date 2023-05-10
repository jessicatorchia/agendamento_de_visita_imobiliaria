import { Express } from 'express'
import { ServicoProprietario } from '../servico/proprietario';

export const createProprietario = (site: Express, servico: ServicoProprietario)=>{
    site.post('/proprietario', async(req, res)=>{
        try{
            await servico.create(
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