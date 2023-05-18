import { Express } from 'express'
import { ServicoCliente } from "../servico/cliente";

export const novoCliente = (site: Express, servico: ServicoCliente)=>{
    site.get('/cliente-novo', async(req, res)=>{
        
        res.send(`
        <form action="/cliente" method="post">
        <label>Nome:</label><input name="nome"><br />
        <label>Telefone:</label><input name="tel"><br />
        <label>Email:</label><input name="email"><br />
        
        <button>Enviar</button>
        </form>
        <br/>
        <a href="cliente">Voltar</a>
        `)
    })
}  