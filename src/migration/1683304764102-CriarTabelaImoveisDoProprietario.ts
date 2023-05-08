import { MigrationInterface, QueryRunner } from "typeorm"

export class CriarTabelaImoveisDoProprietario1683304764102 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query(
            `CREATE TABLE imoveisDoProprietario(
                proprietario_id int not null, 
                imovel_id int not null,
                foreign key (proprietario_id) references proprietarios(id),
                foreign key (imovel_id) references imoveis(id)
            )`,
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE imoveisDoProprietario`)
    }

}
