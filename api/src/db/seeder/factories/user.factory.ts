import { Constructor } from '@mikro-orm/core';
import { Factory, Faker } from '@mikro-orm/seeder';
import { User } from '../../entities/user/user.entity';

export class UserFactory extends Factory<User> {
  model = User;

  protected definition(faker: Faker): Partial<User> {
    return {
      name: faker.name.findName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    };
  }
}
