import { Migration } from '@mikro-orm/migrations';

export class Migration20220910115413 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "cart" ("id" serial primary key, "owner_id" int not null);');
    this.addSql('alter table "cart" add constraint "cart_owner_id_unique" unique ("owner_id");');

    this.addSql('create table "cart_item" ("id" serial primary key, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "product_id" int not null, "quantity" int not null, "cart_id" int not null);');
    this.addSql('alter table "cart_item" add constraint "cart_item_product_id_cart_id_unique" unique ("product_id", "cart_id");');

    this.addSql('alter table "cart" add constraint "cart_owner_id_foreign" foreign key ("owner_id") references "customer" ("id") on update cascade;');

    this.addSql('alter table "cart_item" add constraint "cart_item_product_id_foreign" foreign key ("product_id") references "product" ("id") on update cascade;');
    this.addSql('alter table "cart_item" add constraint "cart_item_cart_id_foreign" foreign key ("cart_id") references "cart" ("id") on update cascade;');

    this.addSql('alter table "customer" add column "cart_id" int not null;');
    this.addSql('alter table "customer" add constraint "customer_cart_id_foreign" foreign key ("cart_id") references "cart" ("id") on update cascade;');
    this.addSql('alter table "customer" add constraint "customer_email_unique" unique ("email");');
    this.addSql('alter table "customer" add constraint "customer_cart_id_unique" unique ("cart_id");');

    this.addSql('alter table "product" add column "price" decimal(12, 2) not null;');
    this.addSql('alter table "product" add constraint "product_label_unique" unique ("label");');
  }

  async down(): Promise<void> {
    this.addSql('alter table "customer" drop constraint "customer_cart_id_foreign";');

    this.addSql('alter table "cart_item" drop constraint "cart_item_cart_id_foreign";');

    this.addSql('drop table if exists "cart" cascade;');

    this.addSql('drop table if exists "cart_item" cascade;');

    this.addSql('alter table "customer" drop constraint "customer_email_unique";');
    this.addSql('alter table "customer" drop constraint "customer_cart_id_unique";');
    this.addSql('alter table "customer" drop column "cart_id";');

    this.addSql('alter table "product" drop constraint "product_label_unique";');
    this.addSql('alter table "product" drop column "price";');
  }

}
