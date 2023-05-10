export class Agendamento{
    id?:number
    data_hora: Date
    imovel_id: number
    cliente_id: number
    corretor_id: number

    constructor(id:number|undefined, data_hora: Date, 
        imovel_id: number, cliente_id: number, corretor_id: number){

        this.id = id
        this.data_hora = data_hora
        this.imovel_id = imovel_id
        this.cliente_id = cliente_id
        this.corretor_id = corretor_id


        if(!data_hora){
            throw new Error('Agendamento precisa de data_hora')
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