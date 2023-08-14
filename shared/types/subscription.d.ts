export interface CreateSubscriptionInput {
  name: string;
  amount: number;
  duration: number;
  benefits: Benefits[];
}

export interface Benefits {
  benefit: string;
  id?: string;
  planId?: string;
  updatedAt?: string;
  createdAt?: string;
}

export interface CreateSubscriptionOutput {
  success: boolean;
  data: SubscriptionPlan
}

export interface SubscriptionPlan {
    id: string;
    name: string;
    amount: number;
    duration: number;
    benefits: Benefits[];
    updatedAt: string;
    createdAt: string;
    privateMessaging?: boolean
    googleId?: string
    appleId?: string
    analystPickAccess?: string[]
    chatAccess?: string[]
}

export interface SubscriptionPlanResult {
    success: boolean;
    data: SubscriptionPlan[]
}
