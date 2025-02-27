import { 
    Entity, 
    PrimaryGeneratedColumn, 
    Column, 
    CreateDateColumn, 
    UpdateDateColumn, 
    DeleteDateColumn,
    OneToMany
  } from 'typeorm';
  import { Transaction } from './transaction';
  
  @Entity('cad_user')
  export class User {

    @PrimaryGeneratedColumn('increment',)
    id: number

    @Column({ length: 100 })
    username: string;
  
    @Column({ name: 'password_hash', length: 255 })
    password: string;
  
    @CreateDateColumn({ name: 'create_date', select: false })
    create_date: Date;
  
    @UpdateDateColumn({ name: 'updated_date', select: false })
    updated_date: Date;
  
    @DeleteDateColumn({ name: 'deleted_date', nullable: true,  select: false })
    deleted_date: Date;
  
    @OneToMany(() => Transaction, transaction => transaction.user)
    transactions: Transaction[];
  
  }