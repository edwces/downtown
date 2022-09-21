import { Migration } from '@mikro-orm/migrations';

export class Migration20220921101301 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "product" add column "image_path" varchar(255) not null;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "product" drop column "image_path";');
  }

}
