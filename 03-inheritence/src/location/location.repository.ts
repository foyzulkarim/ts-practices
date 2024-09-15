import { AppDataSource } from '../data-source';
import { Location } from './location.entity';
import { Repository, Like, In } from 'typeorm';

export class LocationRepository {
  private repository: Repository<Location>;

  constructor() {
    this.repository = AppDataSource.getRepository(Location);
  }

  async save(location: Location): Promise<Location> {
    return this.repository.save(location);
  }

  async saveMany(locations: Location[]): Promise<Location[]> {
    return this.repository.save(locations);
  }

  async update(location: Location): Promise<Location> {
    return this.repository.save(location);
  }

  async updateMany(locations: Location[]): Promise<Location[]> {
    return this.repository.save(locations);
  }

  async delete(id: number): Promise<void> {
    await this.repository.delete(id);
  }

  async deleteMany(ids: number[]): Promise<void> {
    await this.repository.delete(ids);
  }

  async findOne(id: number): Promise<Location | null> {
    return this.repository.findOne({
      where: {
        id,
      },
    });
  }

  async findMany(ids: number[]): Promise<Location[]> {
    return this.repository.findBy({
      id: In(ids),
    });
  }

  async search(keyword: string): Promise<Location[]> {
    return this.repository.find({
      where: [
        {
          address: Like(`%${keyword}%`),
        },
        {
          city: Like(`%${keyword}%`),
        },
        {
          state: Like(`%${keyword}%`),
        },
        {
          zipCode: Like(`%${keyword}%`),
        },
        {
          country: Like(`%${keyword}%`),
        },
      ],
    });
  }
}
