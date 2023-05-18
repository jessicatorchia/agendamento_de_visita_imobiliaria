import { Express } from 'express'

export const pageHome = (site: Express)=>{
    site.get('/imobiliaria-home', async(req, res)=>{
        try{
            
            let html = `
            <h3>Clientes: </h3>
            <a href="cliente">Lista e cadastro clientes</a>
            <h3>Proprietarios: </h3>
            <a href="proprietario">Lista e cadastro proprietarios</a>
            <h3>Corretores: </h3>
            <a href="corretor">Lista e cadstro corretores</a>
            <h3>Imóveis: </h3>
            <a href="imovel">Lista e cadastro imoveis</a>
            <h3>Agendamentos: </h3>
            <a href="agendamento">Lista e cadastro agendamentos</a>
            `
            
            res.send(html)
        }catch(erro){
            console.error(erro)
            res.status(500)
            res.send(erro.message)
        }
    })
}