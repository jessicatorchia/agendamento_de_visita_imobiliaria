import { Express } from 'express'
import { ServicoCorretor } from '../servico/corretor';

export const updateCorretor = (site: Express, servico: ServicoCorretor)=>{
    site.post('/corretor/:id', async(req, res)=>{
        try{
            await servico.update(
                Number(req.params.id),
                req.body.nome,
                req.body.tel,
                req.body.email
            )
            res.send(`corretor alterado com sucesso
            <br/>
            <a href="/corretor">Voltar</a>
            `)
        }catch(erro){
            console.error(erro)
            res.status(500)
            res.send(erro.message)
        }
    })
}