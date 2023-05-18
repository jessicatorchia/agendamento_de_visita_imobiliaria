import { Express } from 'express'
import { ServicoProprietario } from '../servico/proprietario';

export const listarProprietario = (site: Express, servico: ServicoProprietario)=>{
    site.get('/proprietario', async(req, res)=>{
        try{
            const proprietarios = await servico.listar()
            let html = `
            <h3>Cadastro de Proprietário: </h3>
            <a href="proprietario-novo">cadastrar novo proprietário</a>
            <table>
            <tr>
                <th>Nome</th>
                <th>Telefone</th>
                <th>Email</th>
                <th>Ações</th>
            </tr>`
            proprietarios.forEach(proprietario =>{
                html += `
                <tr>
                    <td>${proprietario.nome}</td>
                    <td>${proprietario.tel}</td>
                    <td>${proprietario.email}</td>
                    <td><a href="proprietario/${proprietario.id}">editar</a></td>
                </tr>
                `
            })
            html += `
            <h3>Lista Proproetários: </h3> 
            </table>
            <br/>
            <a href="imobiliaria-home">Voltar</a>
            `
            res.send(html)
        }catch(erro){
            console.error(erro)
            res.status(500)
            res.send(erro.message)
        }
    })
}