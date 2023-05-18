import { Express } from 'express'
import { ServicoCorretor } from '../servico/corretor'

export const novoCorretor = (site: Express, servico: ServicoCorretor)=>{
    site.get('/corretor-novo', async(req, res)=>{
        
        res.send(`
        <form action="/corretor" method="post">
        <label>Nome:</label><input name="nome"><br />
        <label>Telefone:</label><input name="tel"><br />
        <label>Email:</label><input name="email"><br />
        <label>Ativo:</label><input type="checkbox" name="ativo" value="true"><br />
        
        <button>Enviar</button>
        </form>
        <br/>
        <a href="/corretor">Voltar</a>
        `)
    })
}