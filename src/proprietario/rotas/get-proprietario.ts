import { Express } from 'express'
import { ServicoProprietario } from '../servico/proprietario';

export const getProprietario = (site: Express, servico: ServicoProprietario)=>{
    site.get('/proprietario/:id', async(req, res)=>{
        try{
            const proprietario = await servico.get(Number(req.params.id))
            
            const html = `
            <form action="/proprietario/${proprietario.id}" method="post">
            <b>Nome:</b><input name="nome" value=${proprietario.nome}"/><br>
            <b>Tel:</b><input name="tel" value=${proprietario.tel}"/><br>
            <b>Email:</b><input name="email" value=${proprietario.email}"/><br>

            <button>Salvar Alterações</button>
            </form>
            `
            res.send(html)
        }catch(erro){
            console.error(erro)
            res.status(500)
            res.send(erro.message)
        }
    })
}