
'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { MapPin, Mail, Phone } from 'lucide-react';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { ShimmerButton } from '@/components/ui/shimmer-button';
import { InteractiveGridPattern } from '@/components/ui/interactive-grid-pattern';

const formSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  college: z.string().min(2, { message: 'Please enter your college name.' }),
  message: z.string().min(10, { message: 'Message must be at least 10 characters.' }),
});

export default function ContactPage() {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      college: '',
      message: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error('Something went wrong');
      }

      toast({
        title: 'Message Sent!',
        description: 'Thanks for reaching out. We will get back to you shortly.',
      });
      form.reset();
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: 'There was a problem with your request. Please try again.',
      });
    }
  }

  return (
    <InteractiveGridPattern>
        <div className="grid md:grid-cols-2 gap-12">
        <div>
            <h1 className="font-headline text-4xl uppercase tracking-wider mb-4">Get in Touch</h1>
            <p className="text-muted-foreground mb-8 text-lg">
            Have a question or want to get involved? We'd love to hear from you.
            </p>
            <div className="space-y-6">
            <div className="flex items-start gap-4">
                <div className="bg-accent/20 p-3 rounded-full">
                <MapPin className="h-6 w-6 text-accent" />
                </div>
                <div>
                <h3 className="font-semibold text-lg">Fest Location</h3>
                <p className="text-muted-foreground">PSIT, Kanpur</p>
                </div>
            </div>
            <div className="flex items-start gap-4">
                <div className="bg-accent/20 p-3 rounded-full">
                    <Mail className="h-6 w-6 text-accent" />
                </div>
                <div>
                <h3 className="font-semibold text-lg">Email Us</h3>
                <p className="text-muted-foreground">contact@ignitia.in</p>
                </div>
            </div>
            <div className="flex items-start gap-4">
                <div className="bg-accent/20 p-3 rounded-full">
                    <Phone className="h-6 w-6 text-accent" />
                </div>
                <div>
                <h3 className="font-semibold text-lg">Call Us</h3>
                <p className="text-muted-foreground">(+91) 123-456-7890</p>
                </div>
            </div>
            </div>
            <div className="mt-8">
                <Card>
                    <CardContent className="p-2">
                        <div className="aspect-video bg-muted rounded-md">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3573.308259463768!2d80.20810931503448!3d26.41285198334543!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399c37bd7ac9f473%3A0xA66a1a2858852329!2sPranveer%20Singh%20Institute%20of%20Technology%20(PSIT)!5e0!3m2!1sen!2sin!4v1672924532900!5m2!1sen!2sin"
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen={false}
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                className="rounded-md"
                            ></iframe>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
        <Card>
            <CardHeader>
            <CardTitle>Send us a Message</CardTitle>
            <CardDescription>Fill out the form and our team will get back to you.</CardDescription>
            </CardHeader>
            <CardContent>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                        <Input placeholder="John Doe" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Email Address</FormLabel>
                        <FormControl>
                        <Input placeholder="john.doe@example.com" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="college"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>College Name</FormLabel>
                        <FormControl>
                        <Input placeholder="University of Technology" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Your Message</FormLabel>
                        <FormControl>
                        <Textarea placeholder="How can we help?" {...field} rows={5} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                <ShimmerButton type="submit" className="w-full" disabled={form.formState.isSubmitting}>
                    {form.formState.isSubmitting ? 'Sending...' : 'Send Message'}
                </ShimmerButton>
                </form>
            </Form>
            </CardContent>
        </Card>
        </div>
    </InteractiveGridPattern>
  );
}
