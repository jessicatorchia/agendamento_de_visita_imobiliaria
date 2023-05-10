import { MigrationInterface, QueryRunner } from "typeorm"

export class CriarClientes1683668527779 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query(
            `CREATE TABLE clientes(
                id serial not null, 
                nome varchar not null,
                tel varchar not null,
                email varchar not null,
                primary key (id)
            )`,
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE clientes`)
    }

}