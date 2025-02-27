import { 
    Entity, 
    PrimaryGeneratedColumn, 
    Column, 
    CreateDateColumn, 
    UpdateDateColumn, 
    DeleteDateColumn,
    ManyToOne,
    JoinColumn
  } from 'typeorm';
  import { User } from './user';
  
  @Entity('cad_transaction')
  export class Transaction {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
    amount: number;
  
    @Column({ length: 255 })
    type: string;
  
    @Column({ name: 'user_id' })
    user_id: number;
  
    @ManyToOne(() => User, user => user.transactions)
    @JoinColumn({ name: 'user_id' })
    user: User;
  
    @CreateDateColumn({ name: 'create_date' })
    create_date: Date;
  
    @UpdateDateColumn({ name: 'updated_date', select:false })
    updated_date: Date;
  
    @DeleteDateColumn({ name: 'deleted_date', nullable: true, select:false })
    deleted_date: Date | null;
  }