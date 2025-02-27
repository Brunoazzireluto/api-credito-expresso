export interface ITransaction {
    id?: number;
    amount: number;
    type: string;
    user_id: number;
    create_date?: Date;
  }