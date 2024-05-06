enum SplitType {
  PERCENTAGE = "percentage",
  FLAT = "flat",
}

interface Subaccount {
  id: string;
  split_type?: SplitType;
  transaction_charge?: number;
}

export interface InitializeResponse {
  message: string;
  status: string;
  data: {
    checkout_url: string;
  };
}

export interface InitializeOptions {
  first_name: string;
  last_name: string;
  email: string;
  currency: string;
  amount: string;
  tx_ref: string;
  callback_url?: string;
  return_url?: string;
  customization?: {
    title?: string;
    description?: string;
    logo?: string;
  };
  subaccounts?: Subaccount[];
}

export interface VerifyResponse {
  message: string;
  status: string;
  data: {
    first_name: string;
    last_name: string;
    email: string;
    currency: string;
    amount: string;
    charge: string;
    mode: string;
    method: string;
    type: string;
    status: string;
    reference: string;
    tx_ref: string;
    customization: {
      title: string;
      description: string;
      logo: string;
    };
    meta: any;
    created_at: Date;
    updated_at: Date;
  };
}
