'use client';
import * as React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const RegisterFormSchema = z.object({
  name: z.string().min(3, 'Name should be at least 2 characters.'),
  email: z.string().email({
    message: 'Please enter a valid email.',
  }),
  password: z.string().min(6, 'Password should be at least 6 characters.'),
});

export function RegisterForm() {
  const router = useRouter();

  const form = useForm<z.infer<typeof RegisterFormSchema>>({
    resolver: zodResolver(RegisterFormSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  async function onSubmit(data: z.infer<typeof RegisterFormSchema>) {
    // console.log(data);

    const { name, email, password } = data;

    try {
      const res = await fetch('/api/user/getUser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const { user } = await res.json();
      if (user) {
        toast.error('User already exists');
        return;
      }

      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      if (response.ok) {
        form.reset();
        router.push('/login');
      } else {
        toast.error('Error registering user');
      }
    } catch (error) {
      console.error(error);
      toast.error('Error registering user');
    }
  }

  return (
    <div className="w-full flex flex-col items-center justify-center gap-y-4">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-[300px] md:w-1/3 flex flex-col justify-center items-center gap-y-4"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="font-bold text-foreground text-xl">Name</FormLabel>
                <FormControl>
                  <Input className="text-lg px-4 py-2 bg-foreground text-background" placeholder="Mehmet" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="font-bold text-foreground text-xl">Email</FormLabel>
                <FormControl>
                  <Input
                    className="text-lg px-4 py-2 bg-foreground text-background"
                    placeholder="myildizwork@gmail.com"
                    type="email"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="font-bold text-foreground text-xl">Password</FormLabel>
                <FormControl>
                  <Input
                    className="text-lg px-4 py-2 bg-foreground text-background"
                    placeholder="Password"
                    type="password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" size={'lg'} className="text-lg bg-foreground text-background hover:bg-accent">
            Register
          </Button>
        </form>
      </Form>
      <Link href="/login" className="text-foreground hover:text-accent">
        I have account
      </Link>
    </div>
  );
}
