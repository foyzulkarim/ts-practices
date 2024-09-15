import { Entity, Column } from 'typeorm';

import { BaseEntity } from '../common/data/Entity';

@Entity()
export class Location extends BaseEntity {
  @Column()
  address: string;

  @Column()
  city: string;

  @Column()
  state: string;

  @Column()
  zipCode: string;

  @Column()
  country: string;

  constructor(
    address: string,
    city: string,
    state: string,
    zipCode: string,
    country: string
  ) {
    super();
    this.address = address;
    this.city = city;
    this.state = state;
    this.zipCode = zipCode;
    this.country = country;
  }
}
