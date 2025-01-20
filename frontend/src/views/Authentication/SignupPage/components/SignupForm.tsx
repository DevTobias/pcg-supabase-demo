'use client';

import type { ComponentPropsWithoutRef } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import { GoogleIcon } from '$/components/icons/GoogleIcon';
import { Button } from '$/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '$/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '$/components/ui/form';
import { Input } from '$/components/ui/input';
import { cn } from '$/lib/utils';
import { signUpWithEmail } from '$/services/supabase/authentication';

const signupFormSchema = z.object({
  email: z.string({ required_error: 'Required' }).email({ message: 'Invalid email format' }),
  password: z.string({ required_error: 'Required' }),
});

type SignupFormPayload = z.infer<typeof signupFormSchema>;

export const SignupForm = ({ className, ...props }: ComponentPropsWithoutRef<'div'>) => {
  const form = useForm<SignupFormPayload>({
    defaultValues: { email: '', password: '' },
    resolver: zodResolver(signupFormSchema),
  });

  const onSubmit = async ({ email, password }: SignupFormPayload) => {
    toast.promise(signUpWithEmail(email, password), {
      error: (error) => error,
      loading: 'Creating user account...',
      success: 'Signup successful, please check your email to verify your account.',
    });
  };

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className='text-2xl'>Sign up</CardTitle>
          <CardDescription>Enter your data to create a new account</CardDescription>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className='flex flex-col gap-6'>
                <FormField
                  control={form.control}
                  name='email'
                  render={({ field }) => (
                    <FormItem>
                      <div className='flex justify-between'>
                        <FormLabel>Email</FormLabel>
                        <FormMessage />
                      </div>
                      <FormControl>
                        <Input placeholder='m@example.com' type='email' {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='password'
                  render={({ field }) => (
                    <FormItem>
                      <div className='flex justify-between'>
                        <FormLabel>Password</FormLabel>
                        <FormMessage />
                      </div>
                      <FormControl>
                        <Input type='password' {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <Button className='w-full' type='submit'>
                  Signup
                </Button>

                <div className='after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t'>
                  <span className='bg-background text-muted-foreground relative z-10 px-2'>or continue with</span>
                </div>

                <Button className='w-full' variant='outline'>
                  <GoogleIcon className='mr-1' />
                  <span> Signup with Google</span>
                </Button>
              </div>

              <div className='mt-4 text-center text-sm'>
                Already have an account?{' '}
                <Link className='underline underline-offset-4' href='/login'>
                  Login
                </Link>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};
