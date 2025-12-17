
'use client';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ShimmerButton } from '@/components/ui/shimmer-button';
// Firebase removed - using Rust backend
// TODO: Implement event creation API calls to Rust backend
import { useToast } from '@/hooks/use-toast';
import { PlaceHolderImages } from '@/lib/data/placeholder-images';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { eventCategories, eventSubCategories } from '@/lib/data/placeholder-data';
import { useState } from 'react';

const formSchema = z.object({
  name: z.string().min(3, { message: 'Event name must be at least 3 characters.' }),
  description: z.string().min(10, { message: 'Description must be at least 10 characters.' }),
  date: z.string().refine((val) => !isNaN(Date.parse(val)), { message: "Invalid date format" }),
  location: z.string().min(3, { message: 'Location must be at least 3 characters.' }),
  category: z.string().min(1, { message: 'Please select a category.'}),
  subCategory: z.string().min(1, { message: 'Please select a sub-category.'}),
});

export function AddEventForm() {
  const { toast } = useToast();
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      description: '',
      date: '',
      location: '',
      category: '',
      subCategory: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
        // TODO: Implement event creation with Rust backend
        // For now, show success message
        const randomImage = PlaceHolderImages[Math.floor(Math.random() * PlaceHolderImages.length)];
        
        // TODO: Send POST request to Rust backend /api/events
        console.log('Event data to send to Rust backend:', {
            ...values,
            price: 150, // Default price
            registeredAttendees: 0,
            image: {
                imageUrl: randomImage.imageUrl,
                imageHint: randomImage.imageHint,
            },
        });

        toast({
            title: 'Event Created!',
            description: `${values.name} has been successfully added.`,
        });
        form.reset();
        setSelectedCategory('');
    } catch (error: any) {
        console.error("Error creating event: ", error);
        toast({
            variant: 'destructive',
            title: 'Uh oh! Something went wrong.',
            description: error.message || 'There was a problem creating the event.',
        });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Event Name</FormLabel>
              <FormControl>
                <Input placeholder="e.g., CodeFest 2026" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder="Describe the event in detail..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Date</FormLabel>
                    <FormControl>
                        <Input type="datetime-local" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Location</FormLabel>
                    <FormControl>
                        <Input placeholder="e.g., Main Auditorium" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
            />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Category</FormLabel>
                        <Select onValueChange={(value) => {
                            field.onChange(value);
                            setSelectedCategory(value);
                            form.setValue('subCategory', ''); // Reset subcategory when category changes
                        }} defaultValue={field.value}>
                            <FormControl>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select a category" />
                                </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                                {eventCategories.map(cat => (
                                    <SelectItem key={cat.id} value={cat.id}>{cat.name}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <FormMessage />
                    </FormItem>
                )}
                />
            <FormField
                control={form.control}
                name="subCategory"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Sub-Category</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value} disabled={!selectedCategory}>
                            <FormControl>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select a sub-category" />
                                </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                                {selectedCategory && eventSubCategories[selectedCategory]?.map(subCat => (
                                     <SelectItem key={subCat.id} value={subCat.id}>{subCat.name}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <FormMessage />
                    </FormItem>
                )}
            />
        </div>

        <ShimmerButton type="submit" className="w-full" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? 'Creating Event...' : 'Create Event'}
        </ShimmerButton>
      </form>
    </Form>
  );
}
