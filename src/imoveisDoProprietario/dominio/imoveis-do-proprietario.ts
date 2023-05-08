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