import {
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  VersionColumn,
  Column,
} from 'typeorm';

export interface IEntity {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  version: number;
  isDeleted: boolean;
}

@Entity()
export class BaseEntity implements IEntity {
  @PrimaryGeneratedColumn({
    type: 'int',
    name: 'id',
  })
  id!: number;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @VersionColumn({
    default: 1,
  })
  version!: number;

  @Column({ default: false })
  isDeleted!: boolean;
}
