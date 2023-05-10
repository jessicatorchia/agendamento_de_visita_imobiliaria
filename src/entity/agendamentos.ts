import{
    Entity,
    Column,
    PrimaryGeneratedColumn,
} from 'typeorm'

@Entity('agendamentos')
export default class AgendamentosDB {

    @PrimaryGeneratedColumn()
        id: number

    @Column()
        data_hora: Date

    @Column()
        imovel_id: number

    @Column()
        cliente_id: number

    @Column()
        corretor_id: number
}