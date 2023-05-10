import { MigrationInterface, QueryRunner } from "typeorm"

export class CriarImoveis1683667628915 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query(
            `CREATE TABLE imoveis(
                id serial not null, 
                cidade varchar not null,
                bairro varchar not null,
                endereco varchar not null,
                valor_aluguel numeric(20,2),
                valor_venda numeric(20,2),
                ativo boolean not null,
                primary key (id)
            )`,
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE imoveis`)
    }

}
