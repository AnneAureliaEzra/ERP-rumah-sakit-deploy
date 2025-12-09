export enum ModuleType {
  DASHBOARD = 'DASHBOARD',
  CLINICAL = 'CLINICAL',
  FINANCE = 'FINANCE',
  INVENTORY = 'INVENTORY',
  AI_ANALYTICS = 'AI_ANALYTICS'
}

export interface Patient {
  id: string;
  name: string;
  dob: string;
  gender: 'Male' | 'Female';
  insuranceProvider: string;
  lastVisit: string;
  status: 'Admitted' | 'Discharged' | 'Outpatient';
  diagnosis?: string;
}

export interface FinancialMetric {
  month: string;
  revenue: number;
  expenses: number;
  cashFlow: number;
}

export interface ClaimData {
  payer: string;
  amount: number;
  daysOverdue: number;
  status: 'Pending' | 'Denied' | 'Paid';
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
  isThinking?: boolean;
}