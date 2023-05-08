import{
    Entity,
    Column,
    PrimaryGeneratedColumn,
} from 'typeorm'

@Entity('proprietarios')
export default class ProprietariosDB {

    @PrimaryGeneratedColumn()
        id: number

    @Column()
        nome: string

    @Column()
        tel: string

    @Column()
        email: string
}