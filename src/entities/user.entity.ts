import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum UserRole {
  ADMIN = 'admin',
  BACKOFFICE = 'backoffice',
  CAMPO = 'campo',
}

@Entity({ name: 'user' })
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 45, nullable: false })
  name: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    nullable: false,
  })
  role: UserRole;

  @Column({ type: 'varchar', length: 45, unique: true, nullable: true })
  email: string;

  @Column({ name: 'password_at', type: 'varchar', length: 255, nullable: true })
  passwordHash: string;

  @CreateDateColumn( {name: 'created_at'} )
  created_at: string;

  @UpdateDateColumn( {name: 'update_at'} )
  updated_at: string;

  @DeleteDateColumn( {name: 'deactivated_at'} )
  deactivatedAt: string;
}
