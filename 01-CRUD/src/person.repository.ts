import { AppDataSource } from './data-source';
import { Person } from './person.entity';
import { Repository, Like } from 'typeorm';

export class PersonRepository {
    private repository: Repository<Person>;

    constructor() {
        this.repository = AppDataSource.getRepository(Person);
    }

    async save(person: Person): Promise<Person> {
        return this.repository.save(person);
    }

    async update(person: Person): Promise<Person> {
        return this.repository.save(person);
    }

    async delete(id: number): Promise<void> {
        await this.repository.delete(id);
    }

    async findOne(id: number): Promise<Person | null> {
        return this.repository.findOne({
            where: {
                id,
            },
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
