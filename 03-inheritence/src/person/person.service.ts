import { Person } from './person.entity';
import { PersonRepository } from './person.repository';

export type PersonData = {
  name: string;
  email: string;
  phone: string;
  dateOfBirth?: Date;
};

export class PersonService {
  private personRepository: PersonRepository;

  constructor() {
    this.personRepository = new PersonRepository();
  }

  async save(data: PersonData): Promise<Person> {
    const person = new Person(
      data.name,
      data.email,
      data.phone,
      data.dateOfBirth ?? new Date()
    );
    return this.personRepository.save(person);
  }

  // update method. check if the id is present or not and then update the person
  async update(id: number, data: PersonData): Promise<Person | null> {
    const person = await this.personRepository.findOne(id);
    if (!person) {
      return null;
    }

    const { name, email, phone, dateOfBirth } = data;
    const updatedPerson = {
      ...person,
      ...(name && { name }),
      ...(email && { email }),
      ...(phone && { phone }),
      ...(dateOfBirth && { dateOfBirth }),
    };

    console.log('Updating person:', updatedPerson);

    return this.personRepository.update(updatedPerson);
  }

  // delete method. check if the id is present or not and then delete the person
  async delete(id: number): Promise<boolean> {
    const person = await this.personRepository.findOne(id);
    if (!person) {
      return false;
    }

    await this.personRepository.delete(id);
    return true;
  }

  async findOne(id: number): Promise<Person | null> {
    return this.personRepository.findOne(id);
  }

  // search method. search the person by name, email, and phone
  async search(keyword: string): Promise<Person[]> {
    return this.personRepository.search(keyword);
  }
}
