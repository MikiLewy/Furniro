import { ElementType } from 'react';

export interface Route {
  key: string;
  title: string;
  href: string;
  icon: ElementType;
  primary?: boolean;
}
