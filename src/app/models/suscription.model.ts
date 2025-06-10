export interface Suscription {
    id: number;
  cost: number;
  billingDate: string;
  status: 'ACTIVE' | 'INACTIVE';
  category: {
    id: number;
    name: string;
  };
  prestacion: {
    id: number;
    name: string;
  };
}

export interface SubscriptionCreate {
  userId: number;
  prestacionId: number;
  categoryId: number;
  cost: number;
  billingDate: string;
}