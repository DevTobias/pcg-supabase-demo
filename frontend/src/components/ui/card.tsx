import type { ComponentProps, FC } from 'react';

import * as React from 'react';

import { cn } from '$/lib/utils';

export const Card: FC<ComponentProps<'div'>> = ({ className, ...props }) => (
  <div className={cn('bg-card text-card-foreground rounded-lg border shadow-sm', className)} {...props} />
);

export const CardHeader: FC<ComponentProps<'div'>> = ({ className, ...props }) => (
  <div className={cn('flex flex-col space-y-1.5 p-6', className)} {...props} />
);

export const CardTitle: FC<ComponentProps<'h3'>> = ({ children, className, ...props }) => (
  <h3 className={cn('text-2xl leading-none font-semibold tracking-tight', className)} {...props}>
    {children}
  </h3>
);

export const CardDescription: FC<ComponentProps<'p'>> = ({ className, ...props }) => (
  <p className={cn('text-muted-foreground text-sm', className)} {...props} />
);

export const CardContent: FC<ComponentProps<'div'>> = ({ className, ...props }) => (
  <div className={cn('p-6 pt-0', className)} {...props} />
);

export const CardFooter: FC<ComponentProps<'div'>> = ({ className, ...props }) => (
  <div className={cn('flex items-center p-6 pt-0', className)} {...props} />
);
