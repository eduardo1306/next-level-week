import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export default class CreatePointItems1591203739691
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'point_items',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
          },
          {
            name: 'point_id',
            type: 'int',
          },
          {
            name: 'item_id',
            type: 'int',
          },
        ],
      }),
    );
    await queryRunner.createForeignKey(
      'point_items',
      new TableForeignKey({
        columnNames: ['point_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'points',
        name: 'PointItemsRelatedPoint',
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      }),
    );
    await queryRunner.createForeignKey(
      'point_items',
      new TableForeignKey({
        columnNames: ['item_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'items',
        name: 'PointItemsRelatedItems',
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('point_items');
  }
}
