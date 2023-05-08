import{
    Entity,
    Column,
    PrimaryGeneratedColumn,
} from 'typeorm'

@Entity('imoveis')
export default class ImoveisDB {

    @PrimaryGeneratedColumn()
        id: number

    @Column()
        cidade: string

    @Column()
        bairro: string

    @Column()
        endereco: string

    @Column()
        valor_aluguel: number

    @Column()
        valor_venda: number

    @Column()
        ativo: boolean
}