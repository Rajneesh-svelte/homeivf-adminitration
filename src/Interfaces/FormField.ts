import { LucideIcon } from 'lucide-react';

export interface FormFieldConfig {
  name: string;
  label: string;
  type: 'text' | 'email' | 'password' | 'number' | 'select' | 'file' | 'button' | 'date' | 'time';
  placeholder?: string;
  required?: boolean;
  icon?: LucideIcon;
  multiple?: boolean;
  onClick?: () => void;

  options?: {
    label: string;
    value: string | number;
  }[];
}
