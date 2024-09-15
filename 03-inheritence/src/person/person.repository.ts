import { AppDataSource } from '../data-source';
import { Person } from './person.entity';
import { Repository, Like, In } from 'typeorm';

export class PersonRepository {
  private repository: Repository<Person>;

  constructor() {
    this.repository = AppDataSource.getRepository(Person);
  }

  async save(person: Person): Promise<Person> {
    return this.repository.save(person);
  }

  async saveMany(people: Person[]): Promise<Person[]> {
    return this.repository.save(people);
  }

  async update(person: Person): Promise<Person> {
    return this.repository.save(person);
  }

  async updateMany(people: Person[]): Promise<Person[]> {
    return this.repository.save(people);
  }

  async delete(id: number): Promise<void> {
    await this.repository.delete(id);
  }

  async deleteMany(ids: number[]): Promise<void> {
    await this.repository.delete(ids);
  }

  async findOne(id: number): Promise<Person | null> {
    return this.repository.findOne({
      where: {
        id,
      },
    });
  }

  async findMany(ids: number[]): Promise<Person[]> {
    return this.repository.findBy({
      id: In(ids),
    });
  }

  async search(keyword: string): Promise<Person[]> {
    return this.repository.find({
      where: [
        {
          name: Like(`%${keyword}%`),
        },
        {
          email: Like(`%${keyword}%`),
        },
        {
          phone: Like(`%${keyword}%`),
        },
      ],
    });
  }
}
