export type PaymentType = 'momo' | 'cash';

export type Preset =
  | 'today'
  | 'yesterday'
  | 'thisWeek'
  | 'past7Days'
  | 'past15Days'
  | 'past30Days'
  | 'past60Days'
  | 'past90Days'
  | 'thisYear'
  | 'lastYear'
  | 'past1Year'
  | 'customRange'
  | 'allTime';

export interface DateRange {
  startDate: Date | string;
  endDate: Date | string;
}

export type UserRoles =
  | 'ADMIN'
  | 'SUPERVISOR'
  | 'MANAGER'
  | 'SALES_REP'
  | 'ACCOUNTANT'
  | 'AUDITOR'
  | 'CUSTOMER_SERVICE_REP'
  | 'GUEST';

export interface IUser {
  id: string;
  name: string;
  email: string;
  role: UserRoles;
}

export interface ISale {
  id: string | number;
  created_at: Date | string;
  createdBy: IUser;
  item: string;
  description: string;
  amount: number;
  transaction_id: string | number;
  paymentType: PaymentType;
}

export interface IExpense extends ISale {
  payee: string;
}

export interface ITransaction {
  id: string | number;
  created_at: Date | string;
  createdBy: IUser;
  name: string;
}
