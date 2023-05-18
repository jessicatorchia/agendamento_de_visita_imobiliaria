import { Express } from 'express'
import { ServicoProprietario } from '../servico/proprietario'

export const novoProprietario = (site: Express, servico: ServicoProprietario)=>{
    site.get('/proprietario-novo', async(req, res)=>{
        
        
        res.send(`
        <form action="/proprietario" method="post">
        <label>Nome:</label><input name="nome"><br />
        <label>Telefone:</label><input name="tel"><br />
        <label>Email:</label><input name="email"><br />
        
        <button>Enviar</button>
        </form>
        <br/>
        <a href="proprietario">Voltar</a>
        `)
    })
}