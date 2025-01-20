'use client';

import type { ComponentPropsWithoutRef } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import { GoogleIcon } from '$/components/icons/GoogleIcon';
import { Button } from '$/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '$/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '$/components/ui/form';
import { Input } from '$/components/ui/input';
import { cn } from '$/lib/utils';
import { signInWithEmail } from '$/services/supabase/authentication';

const loginFormSchema = z.object({
  email: z.string({ required_error: 'Required' }).email({ message: 'Invalid email format' }),
  password: z.string({ required_error: 'Required' }),
});

type LoginFormPayload = z.infer<typeof loginFormSchema>;

export const LoginForm = ({ className, ...props }: ComponentPropsWithoutRef<'div'>) => {
  const router = useRouter();

  const form = useForm<LoginFormPayload>({
    defaultValues: { email: '', password: '' },
    resolver: zodResolver(loginFormSchema),
  });

  const onSubmit = async ({ email, password }: LoginFormPayload) => {
    toast.promise(signInWithEmail(email, password), {
      error: (error) => error,
      loading: 'Signing in...',
      success: () => {
        router.push('/');
        return 'Successfully signed in.';
      },
    });
  };

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className='text-2xl'>Login</CardTitle>
          <CardDescription>Enter your email below to login to your account</CardDescription>
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
                      <div className='flex items-center justify-between'>
                        <FormLabel>Password</FormLabel>
                        <a
                          className='ml-auto inline-block text-sm leading-none underline-offset-4 hover:underline'
                          href='/'
                        >
                          Forgot your password?
                        </a>
                      </div>
                      <FormControl>
                        <Input type='password' {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <Button className='w-full' type='submit'>
                  Login
                </Button>

                <div className='after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t'>
                  <span className='bg-background text-muted-foreground relative z-10 px-2'>or continue with</span>
                </div>

                <Button className='w-full' variant='outline'>
                  <GoogleIcon className='mr-1' />
                  <span> Login with Google</span>
                </Button>
              </div>

              <div className='mt-4 text-center text-sm'>
                Don&apos;t have an account?{' '}
                <Link className='underline underline-offset-4' href='/signup'>
                  Sign up
                </Link>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};
