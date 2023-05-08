export class Corretor{
    id?:number
    nome: string
    tel: string
    email: string
    ativo: boolean

    constructor(id:number|undefined, nome:string, tel:string,
        email: string, ativo: boolean){

        this.id = id
        this.nome = nome
        this.tel = tel
        this.email = email
        this.ativo = ativo

        if(!nome){
            throw new Error('Corretor precisa de nome')
        }
        if(!tel){
            throw new Error('Corretor precisa de tel')
        }
        if(!email){
            throw new Error('Corretor precisa de email')
        }
    }
}