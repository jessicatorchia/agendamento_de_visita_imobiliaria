import{
    Entity,
    PrimaryColumn,
    
} from 'typeorm'

@Entity('imoveisDoProprietario')
export default class ImoveisDoProprietarioDB {

    @PrimaryColumn()
        proprietario_id: number

    @PrimaryColumn()
        imovel_id: number
}