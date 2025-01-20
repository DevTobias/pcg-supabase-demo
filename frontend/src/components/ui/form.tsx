'use client';

import type * as LabelPrimitive from '@radix-ui/react-label';
import type { ComponentProps, FC } from 'react';
import type { ControllerProps, FieldPath, FieldValues } from 'react-hook-form';

import { Slot } from '@radix-ui/react-slot';
import * as React from 'react';
import { createContext, useContext, useId } from 'react';
import { Controller, FormProvider, useFormContext } from 'react-hook-form';

import { Label } from '$/components/ui/label';
import { cn } from '$/lib/utils';

export const Form = FormProvider;

type FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  name: TName;
};

const FormFieldContext = createContext<FormFieldContextValue>({} as FormFieldContextValue);

export const FormField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  ...props
}: ControllerProps<TFieldValues, TName>) => {
  return (
    <FormFieldContext.Provider value={{ name: props.name }}>
      <Controller {...props} />
    </FormFieldContext.Provider>
  );
};

export const useFormField = () => {
  const fieldContext = useContext(FormFieldContext);
  const itemContext = useContext(FormItemContext);
  const { formState, getFieldState } = useFormContext();

  const fieldState = getFieldState(fieldContext.name, formState);

  if (!fieldContext) {
    throw new Error('useFormField should be used within <FormField>');
  }

  const { id } = itemContext;

  return {
    formDescriptionId: `${id}-form-item-description`,
    formItemId: `${id}-form-item`,
    formMessageId: `${id}-form-item-message`,
    id,
    name: fieldContext.name,
    ...fieldState,
  };
};

type FormItemContextValue = {
  id: string;
};

export const FormItemContext = createContext<FormItemContextValue>({} as FormItemContextValue);

export const FormItem: FC<ComponentProps<'div'>> = ({ className, ...props }) => {
  const id = useId();

  return (
    <FormItemContext.Provider value={{ id }}>
      <div className={cn('space-y-2', className)} {...props} />
    </FormItemContext.Provider>
  );
};

export const FormLabel: FC<ComponentProps<typeof LabelPrimitive.Root>> = ({ className, ...props }) => {
  const { error, formItemId } = useFormField();

  return <Label className={cn(error && 'text-destructive', className)} htmlFor={formItemId} {...props} />;
};

export const FormControl: FC<ComponentProps<typeof Slot>> = ({ ...props }) => {
  const { error, formDescriptionId, formItemId, formMessageId } = useFormField();

  return (
    <Slot
      aria-describedby={!error ? `${formDescriptionId}` : `${formDescriptionId} ${formMessageId}`}
      aria-invalid={!!error}
      id={formItemId}
      {...props}
    />
  );
};

export const FormDescription: FC<ComponentProps<'p'>> = ({ className, ...props }) => {
  const { formDescriptionId } = useFormField();

  return <p className={cn('text-muted-foreground text-sm', className)} id={formDescriptionId} {...props} />;
};

export const FormMessage: FC<ComponentProps<'p'>> = ({ children, className, ...props }) => {
  const { error, formMessageId } = useFormField();
  const body = error ? String(error?.message) : children;

  if (!body) {
    return null;
  }

  return (
    <p className={cn('text-destructive text-sm leading-none font-medium', className)} id={formMessageId} {...props}>
      {body}
    </p>
  );
};
