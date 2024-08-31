import { Person } from './person.entity';
import { PersonRepository } from './person.repository';

export type PersonData = {
  name: string;
  email: string;
  phone: string;
  dateOfBirth: Date;
};

export class PersonService {
  private personRepository: PersonRepository;

  constructor() {
    this.personRepository = new PersonRepository();
  }

  async save(data: {
    name: string;
    email: string;
    phone: string;
    dateOfBirth: Date;
  }): Promise<Person> {
    const person = new Person(
      data.name,
      data.email,
      data.phone,
      data.dateOfBirth
    );
    return this.personRepository.save(person);
  }

  // update method. check if the id is present or not and then update the person
  async update(id: number, data: PersonData): Promise<Person | null> {
    const person = await this.personRepository.findOne(id);
    if (!person) {
      return null;
    }

    if (data.name) {
      person.name = data.name;
    }
    if (data.email) {
      person.email = data.email;
    }
    if (data.phone) {
      person.phone = data.phone;
    }
    if (data.dateOfBirth) {
      person.dateOfBirth = data.dateOfBirth;
    }

    console.log('Updating person:', person);

    return this.personRepository.update(person);
  }

  // delete method. check if the id is present or not and then delete the person
  async delete(id: number): Promise<void> {
    const person = await this.personRepository.findOne(id);
    if (!person) {
      return;
    }

    await this.personRepository.delete(id);
  }

  async findOne(id: number): Promise<Person | null> {
    return this.personRepository.findOne(id);
  }

  // search method. search the person by name, email, and phone
  async search(keyword: string): Promise<Person[]> {
    return this.personRepository.search(keyword);
  }
}
