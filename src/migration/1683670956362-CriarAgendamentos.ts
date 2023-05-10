import { MigrationInterface, QueryRunner } from "typeorm"

export class CriarAgendamentos1683670956362 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query(
            `CREATE TABLE agendamentos(
                id serial not null, 
                data_hora Date not null,
                imovel_id int not null,
                cliente_id int not null,
                corretor_id int not null,
                primary key (id),
                foreign key (imovel_id) references imoveis(id),
                foreign key (cliente_id) references clientes(id),
                foreign key (corretor_id) references corretores(id)
            )`,
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE agendamentos`)
    }

}
