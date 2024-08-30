import { AppDataSource } from './data-source';
import { Person } from './person.entity';

async function savePerson() {
  await AppDataSource.initialize();

  const person = new Person(
    `John ${Math.random()}`,
    `john.${Math.random()}@example.com`,
    `+1 555 555 ${Math.floor(Math.random() * 100)}`,
    new Date(`19${Math.floor(Math.random() * 100) + 50}-01-01`) 
  );

  await AppDataSource.manager.save(person);

  console.log('Person saved successfully:', person);

  await AppDataSource.destroy();
}

savePerson();
