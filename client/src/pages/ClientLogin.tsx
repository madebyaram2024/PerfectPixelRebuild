import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useMutation } from '@tanstack/react-query';
import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';
import { Lock, User } from 'lucide-react';

const loginSchema = z.object({
  accessCode: z.string().min(1, 'Access code is required').min(6, 'Access code must be at least 6 characters'),
});

type LoginForm = z.infer<typeof loginSchema>;

export default function ClientLogin() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  const form = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      accessCode: '',
    },
  });

  const loginMutation = useMutation({
    mutationFn: async (data: LoginForm) => {
      const response = await apiRequest('POST', '/api/client/login', data);
      return await response.json();
    },
    onSuccess: (client) => {
      localStorage.setItem('clientData', JSON.stringify(client));
      toast({
        title: "Login Successful",
        description: `Welcome back, ${client.name}!`,
      });
      setLocation('/client/dashboard');
    },
    onError: (error) => {
      toast({
        title: "Login Failed",
        description: error.message || "Invalid access code. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: LoginForm) => {
    loginMutation.mutate(data);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="mx-auto w-16 h-16 bg-primary rounded-full flex items-center justify-center mb-4">
            <User className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Client Portal</h1>
          <p className="text-gray-600">Access your project dashboard</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-center">Welcome Back</CardTitle>
            <CardDescription className="text-center">
              Enter your access code to view your project status
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="accessCode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Access Code</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                          <Input
                            {...field}
                            type="password"
                            placeholder="Enter your access code"
                            className="pl-10"
                            disabled={loginMutation.isPending}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  className="w-full"
                  disabled={loginMutation.isPending}
                >
                  {loginMutation.isPending ? "Signing in..." : "Sign In"}
                </Button>
              </form>
            </Form>

            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-700">
                <strong>Need help?</strong> Contact us at{' '}
                <a href="mailto:support@perfectpixelai.com" className="underline">
                  support@perfectpixelai.com
                </a>{' '}
                if you've lost your access code.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}