import { Express } from 'express'
import { ServicoCorretor } from '../servico/corretor';

export const getCorretor = (site: Express, servico: ServicoCorretor)=>{
    site.get('/corretor/:id', async(req, res)=>{
        try{
            const corretor= await servico.get(Number(req.params.id))
        
            const html = `
            <form action="/corretor/${corretor.id}" method="post">
            <b>Nome:</b><input name="nome" value="${corretor.nome}"/><br>
            <b>Tel:</b><input name="tel" value="${corretor.tel}"/><br>
            <b>Email:</b><input name="email" value="${corretor.email}"/><br>
            <b>Ativo:</b><input name="ativo" value="${corretor.ativo}"/><br>

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