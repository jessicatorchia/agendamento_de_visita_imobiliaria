export class ImoveisDoProprietario{
    proprietario_id:number
    imovel_id: number

    constructor(proprietario_id:number, imovel_id: number){

        this.proprietario_id = proprietario_id
        this.imovel_id = imovel_id

        if(!proprietario_id){
            throw new Error('Imovel do proprietario precido do id do proprietario')
        }
        if(!imovel_id){
            throw new Error('Imovel do proprietario precido do id do imovel')
        }
    }
}

export class Imovel{
    id?:number
    cidade: string
    bairro: string
    endereco: string
    valor_aluguel: number
    valor_venda: number
    ativo: boolean

    constructor(id:number|undefined, cidade: string, bairro: string,
        endereco: string, valor_aluguel: number, valor_venda: number, ativo: boolean){

        this.id = id
        this.cidade = cidade
        this.bairro = bairro
        this.endereco = endereco
        this.valor_aluguel = valor_aluguel
        this.valor_venda = valor_venda
        this.ativo = ativo

        if(!cidade){
            throw new Error('Imovel precisa de cidade')
        }
        if(!bairro){
            throw new Error('Imovel precisa de bairro')
        }
        if(!endereco){
            throw new Error('Imovel precisa de endereco')
        }
    }
}