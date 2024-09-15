import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Location {
  @PrimaryGeneratedColumn()
  id!: number;

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

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  constructor(
    address: string,
    city: string,
    state: string,
    zipCode: string,
    country: string
  ) {
    this.address = address;
    this.city = city;
    this.state = state;
    this.zipCode = zipCode;
    this.country = country;
  }
}
