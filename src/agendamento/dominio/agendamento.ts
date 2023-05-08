export class Agendamento{
    id?:number
    dataHora: Date
    imovel_id: number
    cliente_id: number
    corretor_id: number

    constructor(id:number|undefined, dataHora: Date, 
        imovel_id: number, cliente_id: number, corretor_id: number){

        this.id = id
        this.dataHora = dataHora
        this.imovel_id = imovel_id
        this.cliente_id = cliente_id
        this.corretor_id = corretor_id


        if(!dataHora){
            throw new Error('Agendamento precisa de dataHora')
        }
        if(!imovel_id){
            throw new Error('Agendamento precisa de imovel_id')
        }
        if(!cliente_id){
            throw new Error('Agendamento precisa de cliente_id')
        }
        if(!corretor_id){
            throw new Error('Agendamento precisa de corretor_id')
        }
    }
}