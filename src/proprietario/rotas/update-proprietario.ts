import { Express } from 'express'
import { ServicoProprietario } from '../servico/proprietario';

export const updateProprietario = (site: Express, servico: ServicoProprietario)=>{
    site.post('/proprietario/:id', async(req, res)=>{
        try{
            await servico.update(
                Number(req.params.id),
                req.body.nome,
                req.body.tel,
                req.body.email
            )
            res.send(`proprietario alterado com sucesso
            <br/>
            <a href="/proprietario">Voltar</a>
            `)
        }catch(erro){
            console.error(erro)
            res.status(500)
            res.send(erro.message)
        }
    })
}