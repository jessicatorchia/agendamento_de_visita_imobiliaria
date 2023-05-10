import { MigrationInterface, QueryRunner } from "typeorm"

export class CriarTabelaProprietarios1683303379743 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query(
            `CREATE TABLE proprietarios(
                id serial not null, 
                nome varchar not null,
                tel varchar not null,
                email varchar not null,
                primary key (id)
            )`,
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE proprietarios`)
    }

}
