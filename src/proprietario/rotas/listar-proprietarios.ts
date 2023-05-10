import { Express } from 'express'
import { ServicoProprietario } from '../servico/proprietario';

export const listarProprietario = (site: Express, servico: ServicoProprietario)=>{
    site.get('/proprietario', async(req, res)=>{
        try{
            const proprietarios = await servico.listar()
            
            res.send(proprietarios)
        }catch(erro){
            console.error(erro)
            res.status(500)
            res.send(erro.message)
        }
    })
}