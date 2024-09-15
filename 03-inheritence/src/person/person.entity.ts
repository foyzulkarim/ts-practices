import { Entity, Column } from 'typeorm';

import { BaseEntity } from '../common/data/Entity';

@Entity()
export class Person extends BaseEntity {
  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  phone: string;

  @Column()
  dateOfBirth: Date;

  constructor(name: string, email: string, phone: string, dateOfBirth: Date) {
    super();
    this.name = name;
    this.email = email;
    this.phone = phone;
    this.dateOfBirth = dateOfBirth;
  }
}
