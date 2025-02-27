import { SignupForm } from '$/views/Authentication/SignupPage/components/SignupForm';

export const SignupPage = () => {
  return (
    <div className='flex min-h-svh w-full items-center justify-center p-6 md:p-10'>
      <div className='w-full max-w-sm'>
        <SignupForm />
      </div>
    </div>
  );
};
