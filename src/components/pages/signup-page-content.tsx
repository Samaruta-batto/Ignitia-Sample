
'use client';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { useRouter } from 'next/navigation';
import { User, School, Mail, Lock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import Link from 'next/link';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Logo } from '@/components/icons/logo';
import { cn } from '@/lib/utils';
import { ShimmerButton } from '@/components/ui/shimmer-button';
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';

const steps = [
  {
    icon: User,
    title: 'Personal Info',
    description: 'Start with your basic details',
    fields: ['fullName', 'mobileNumber'],
  },
  {
    icon: School,
    title: 'College Info',
    description: 'Select your college details',
    fields: ['collegeName'],
  },
  {
    icon: Mail,
    title: 'Verification',
    description: 'Verify your email address',
    fields: ['email'],
  },
  {
    icon: Lock,
    title: 'Security',
    description: 'Create a secure password',
    fields: ['password', 'confirmPassword'],
  },
];

const formSchema = z
  .object({
    fullName: z.string().min(2, 'Full name must be at least 2 characters'),
    mobileNumber: z.string().regex(/^\d{10}$/, 'Must be a valid 10-digit number'),
    collegeName: z.string().min(3, 'College name is required'),
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

type FormData = z.infer<typeof formSchema>;

export function SignupPageContent() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const methods = useForm<FormData>({
    resolver: zodResolver(formSchema),
    mode: 'onChange',
    defaultValues: {
      fullName: '',
      mobileNumber: '',
      collegeName: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const { trigger, handleSubmit } = methods;

  const handleNextStep = async () => {
    const fieldsToValidate = steps[currentStep].fields as (keyof FormData)[];
    const isValid = await trigger(fieldsToValidate);
    if (isValid) {
      if (currentStep < steps.length - 1) {
        setCurrentStep(currentStep + 1);
      } else {
        handleSubmit(handleFinalSubmit)();
      }
    }
  };

  const handleFinalSubmit = async (data: FormData) => {
    setIsSubmitting(true);

    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: data.email,
          password: data.password,
          name: data.fullName,
        }),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.error || 'Sign-up failed');
      }

      // Save token to localStorage
      localStorage.setItem('auth_token', result.token);

      // Dispatch custom event to notify other components
      window.dispatchEvent(new CustomEvent('auth-changed'));

      toast({
        title: 'Sign-up Successful!',
        description: 'Welcome to Ignitia!',
      });
      router.push('/');
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Sign-up Failed',
        description: error.message || 'Failed to create account.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <div className="grid w-full max-w-4xl grid-cols-1 md:grid-cols-3 rounded-lg overflow-hidden shadow-2xl bg-card/50">
        <div className="hidden md:flex flex-col gap-8 bg-primary/30 p-8">
            <Logo />
            <div className="flex flex-col gap-6">
            {steps.map((step, index) => (
                <div key={step.title} className="flex items-start gap-4">
                <div
                    className={cn(
                    'flex h-10 w-10 items-center justify-center rounded-full border-2',
                    currentStep === index
                        ? 'border-accent bg-accent text-accent-foreground'
                        : 'border-border bg-transparent text-muted-foreground',
                    currentStep > index && 'border-accent bg-transparent text-accent'
                    )}
                >
                    <step.icon className="h-5 w-5" />
                </div>
                <div>
                    <h3
                    className={cn(
                        'font-semibold',
                        currentStep >= index ? 'text-foreground' : 'text-muted-foreground'
                    )}
                    >
                    {step.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">{step.description}</p>
                </div>
                </div>
            ))}
            </div>
        </div>
        
        <div className="col-span-2 p-8 md:p-12">
          <FormProvider {...methods}>
            <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
                <h2 className="font-headline text-3xl uppercase tracking-wider">{steps[currentStep].title}</h2>
                <p className="text-muted-foreground">
                    {steps[currentStep].description}
                </p>

              {currentStep === 0 && (
                <>
                  <FormField control={methods.control} name="fullName" render={({ field }) => (
                      <FormItem>
                          <FormControl><Input placeholder="Full Name" {...field} /></FormControl>
                          <FormMessage />
                      </FormItem>
                  )} />
                  <FormField control={methods.control} name="mobileNumber" render={({ field }) => (
                      <FormItem>
                          <FormControl><Input placeholder="Mobile Number" {...field} type="tel"/></FormControl>
                          <FormMessage />
                      </FormItem>
                  )} />
                </>
              )}
              {currentStep === 1 && (
                  <FormField control={methods.control} name="collegeName" render={({ field }) => (
                      <FormItem>
                           <FormControl><Input placeholder="College Name" {...field} /></FormControl>
                           <FormMessage />
                      </FormItem>
                  )} />
              )}
              {currentStep === 2 && (
                 <FormField control={methods.control} name="email" render={({ field }) => (
                    <FormItem>
                        <FormControl><Input placeholder="Email" {...field} type="email" /></FormControl>
                        <FormMessage />
                    </FormItem>
                )} />
              )}
              {currentStep === 3 && (
                <>
                  <FormField control={methods.control} name="password" render={({ field }) => (
                      <FormItem>
                          <FormControl><Input placeholder="Create a secure password" {...field} type="password" /></FormControl>
                           <FormMessage />
                      </FormItem>
                  )} />
                  <FormField control={methods.control} name="confirmPassword" render={({ field }) => (
                      <FormItem>
                          <FormControl><Input placeholder="Confirm password" {...field} type="password" /></FormControl>
                           <FormMessage />
                      </FormItem>
                  )} />
                </>
              )}
              
              <ShimmerButton onClick={handleNextStep} className="w-full" disabled={isSubmitting}>
                {isSubmitting
                  ? 'Submitting...'
                  : currentStep === steps.length - 1
                  ? 'Create Account'
                  : 'Continue'}
              </ShimmerButton>
            </form>
          </FormProvider>
          <div className="mt-6 text-center text-sm">
            Already have an account?{' '}
            <Link href="/user-login" className="font-semibold text-accent hover:underline">
              Log in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
