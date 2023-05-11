import{
    Entity,
    PrimaryColumn,
    
} from 'typeorm'

@Entity('imoveis_do_proprietario')
export default class ImoveisDoProprietarioDB {

    @PrimaryColumn()
        proprietario_id: number

    @PrimaryColumn()
        imovel_id: number
}