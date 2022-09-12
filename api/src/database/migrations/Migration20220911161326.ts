import { Migration } from '@mikro-orm/migrations';

export class Migration20220911161326 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "cart" drop constraint "cart_owner_id_foreign";');

    this.addSql('alter table "customer" drop constraint "customer_cart_id_foreign";');

    this.addSql('alter table "cart" drop constraint "cart_owner_id_unique";');
    this.addSql('alter table "cart" drop column "owner_id";');

    this.addSql('alter table "customer" alter column "cart_id" type int using ("cart_id"::int);');
    this.addSql('alter table "customer" alter column "cart_id" drop not null;');
    this.addSql('alter table "customer" add constraint "customer_cart_id_foreign" foreign key ("cart_id") references "cart" ("id") on update cascade on delete set null;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "customer" drop constraint "customer_cart_id_foreign";');

    this.addSql('alter table "customer" alter column "cart_id" type int using ("cart_id"::int);');
    this.addSql('alter table "customer" alter column "cart_id" set not null;');
    this.addSql('alter table "customer" add constraint "customer_cart_id_foreign" foreign key ("cart_id") references "cart" ("id") on update cascade;');

    this.addSql('alter table "cart" add column "owner_id" int not null;');
    this.addSql('alter table "cart" add constraint "cart_owner_id_foreign" foreign key ("owner_id") references "customer" ("id") on update cascade;');
    this.addSql('alter table "cart" add constraint "cart_owner_id_unique" unique ("owner_id");');
  }

}
