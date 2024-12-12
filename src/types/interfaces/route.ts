import { ElementType } from 'react';

export interface Route {
  key: string;
  title: string;
  href?: string;
  onClick?: () => void;
  icon: ElementType;
  primary?: boolean;
}
