import { LucideIcon } from "lucide-react";

export interface SideBarData {
  label: string;
  icon: LucideIcon;
  href: string;
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

interface Subaccount {
  id: string;
  split_type?: SplitType;
  transaction_charge?: number;
}
enum SplitType {
  PERCENTAGE = 'percentage',
  FLAT = 'flat',
}
