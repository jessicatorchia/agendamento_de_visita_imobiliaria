import{
    Entity,
    Column,
    PrimaryGeneratedColumn,
} from 'typeorm'

@Entity('clientes')
export default class ClientesDB {

    @PrimaryGeneratedColumn()
        id: number

    @Column()
        nome: string

    @Column()
        tel: string

    @Column()
        email: string
}