import { Migration } from '@mikro-orm/migrations';

export class Migration20220903152936 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "customer" ("id" serial primary key, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "email" varchar(255) not null, "password" varchar(255) not null, "name" varchar(255) not null, "surname" varchar(255) not null, "role" text check ("role" in (\'USER\', \'ADMIN\')) not null);');

    this.addSql('create table "product" ("id" serial primary key, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "label" varchar(255) not null);');
  }

}
