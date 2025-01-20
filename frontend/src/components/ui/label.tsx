'use client';

import type { ComponentProps, FC } from 'react';

import { Root } from '@radix-ui/react-label';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '$/lib/utils';

export const labelVariants = cva(
  'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
);

export type LabelProps = ComponentProps<typeof Root> & VariantProps<typeof labelVariants>;

export const Label: FC<LabelProps> = ({ className, ...props }) => (
  <Root className={cn(labelVariants(), className)} {...props} />
);
