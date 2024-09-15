import { Location } from './location.entity';
import { LocationRepository } from './location.repository';

export type LocationData = {
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
};

export class LocationService {
  private locationRepository: LocationRepository;

  constructor() {
    this.locationRepository = new LocationRepository();
  }

  async save(data: LocationData): Promise<Location> {
    const location = new Location(
      data.address,
      data.city,
      data.state,
      data.zipCode,
      data.country
    );
    return this.locationRepository.save(location);
  }

  async update(id: number, data: LocationData): Promise<Location | null> {
    const location = await this.locationRepository.findOne(id);
    if (!location) {
      return null;
    }
    location.address = data.address;
    location.city = data.city;
    location.state = data.state;
    location.zipCode = data.zipCode;
    location.country = data.country;
    return this.locationRepository.save(location);
  }

  async delete(id: number): Promise<boolean> {
    const location = await this.locationRepository.findOne(id);
    if (!location) {
      return false;
    }
    await this.locationRepository.delete(id);
    return true;
  }

  async findOne(id: number): Promise<Location | null> {
    return this.locationRepository.findOne(id);
  }

  async search(keyword: string): Promise<Location[]> {
    return this.locationRepository.search(keyword);
  }
}
