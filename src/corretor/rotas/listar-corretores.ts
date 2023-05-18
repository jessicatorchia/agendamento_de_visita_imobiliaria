import { Express } from 'express'
import { ServicoCorretor } from '../servico/corretor';

export const listarCorretor = (site: Express, servico: ServicoCorretor)=>{
    site.get('/corretor', async(req, res)=>{
        try{
            const corretores = await servico.listar()
            let html = `
            <h3>Cadastro de Corretor: </h3>
            <a href="corretor-novo">cadastrar novo corretor</a>
            <table>
            <tr>
                <th>Nome</th>
                <th>Telefone</th>
                <th>Email</th>
                <th>Ativo</th>
                <th>Ações</th>
            </tr>`
            corretores.forEach(corretor =>{
                html += `
                <tr>
                    <td>${corretor.nome}</td>
                    <td>${corretor.tel}</td>
                    <td>${corretor.email}</td>
                    <td>${corretor.ativo}</td>
                    <td><a href="corretor/${corretor.id}">editar</a></td>
                </tr>
                `
            })
            html += `
            <h3>Lista Corretores Cadastrados: </h3>
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