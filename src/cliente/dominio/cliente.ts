export class Cliente{
    id?:number
    nome: string
    tel: string
    email: string

    constructor(id:number|undefined, nome:string, tel:string,
        email: string){

        this.id = id
        this.nome = nome
        this.tel = tel
        this.email = email

        if(!nome){
            throw new Error('Cliente precisa de nome')
        }
        if(!tel){
            throw new Error('Cliente precisa de tel')
        }
        if(!email){
            throw new Error('Cliente precisa de email')
        }
    }
}