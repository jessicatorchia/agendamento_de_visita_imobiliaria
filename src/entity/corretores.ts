import{
    Entity,
    Column,
    PrimaryGeneratedColumn,
} from 'typeorm'

@Entity('corretores')
export default class CorretoresDB {

    @PrimaryGeneratedColumn()
        id: number

    @Column()
        nome: string

    @Column()
        tel: string

    @Column()
        email: string
    
    @Column()
        ativo: boolean
}