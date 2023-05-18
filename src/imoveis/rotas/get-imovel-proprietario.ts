import { Express } from 'express'
import { ServicoImovel } from '../servico/imoveis';

export const getImovelProprietario = (site: Express, servico: ServicoImovel) => {
    site.get('/imovel/proprietario/:id', async (req, res) => {
        try {
            const imovelDoProprietario = await servico.getImovelProprietario(Number(req.params.id))
         
            const html = `
            <b>Id:</b> ${imovelDoProprietario.id}<br>
            <b>Cidade:</b> ${imovelDoProprietario.cidade}<br>
            <b>Bairro:</b> ${imovelDoProprietario.bairro}<br>
            <b>Endereço:</b> ${imovelDoProprietario.endereco}<br>
            <b>Valor Aluguel:</b>${imovelDoProprietario.valor_aluguel}<br>
            <b>Valor Venda:</b>${imovelDoProprietario.valor_venda}<br>
            <b>Ativo:</b>${imovelDoProprietario.ativo}<br>
            <b>Nome do Proprietário:</b>${imovelDoProprietario.proprietario_nome}<br>
            <b>Tel do Proprietário:</b>${imovelDoProprietario.proprietario_tel}<br>
            <b>Email do Proprietário:</b>${imovelDoProprietario.proprietario_email}<br>   
            `

            res.send(html)
        } catch (erro) {
            console.error(erro)
            res.status(500)
            res.send(erro.message)
        }
    })
}