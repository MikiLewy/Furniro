import { ElementType } from 'react';

export interface Route {
  titleKey: string;
  href: string;
  icon: ElementType;
  primary?: boolean;
}
