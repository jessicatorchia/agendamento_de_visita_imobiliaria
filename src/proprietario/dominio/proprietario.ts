export class Proprietario{
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
            throw new Error('Proprietario precisa de nome')
        }
        if(!tel){
            throw new Error('Proprietario precisa de tel')
        }
        if(!email){
            throw new Error('Proprietario precisa de email')
        }
    }
}