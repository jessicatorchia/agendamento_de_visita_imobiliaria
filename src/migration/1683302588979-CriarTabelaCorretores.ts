import { MigrationInterface, QueryRunner } from "typeorm"

export class CriarTabelaCorretores1683302588979 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query(
            `CREATE TABLE corretores(
                id serial not null, 
                nome varchar not null,
                tel varchar not null,
                email varchar not null,
                ativo boolean not null,
                primary key (id)
            )`,
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE correntes`)
    }

}
