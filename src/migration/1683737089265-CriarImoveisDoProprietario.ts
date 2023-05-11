import { MigrationInterface, QueryRunner } from "typeorm"

export class CriarImoveisDoProprietario1683737089265 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query(
            `CREATE TABLE imoveis_do_proprietario(
                proprietario_id int not null, 
                imovel_id int not null,
                foreign key (proprietario_id) references proprietarios(id) ON DELETE CASCADE,
                foreign key (imovel_id) references imoveis(id)  ON DELETE CASCADE
            )`,
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE imoveisDoProprietario`)
    }

}