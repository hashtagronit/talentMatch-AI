import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { Mail, User, Lock } from "lucide-react";
import { useSignUp } from "@/hooks/useSignUp";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpInputSchema, type SignUpInput } from "@/schemas/signUpInputSchema";
import { useAuth } from "@/context/AuthContext";
import { userMapper } from "@/utils/mappers/userMapper";


export function SignUp() {
  const navigate = useNavigate();
  const { handleSignUp, loading } = useSignUp();
  const [error, setError] = useState("");
  const { setUser } = useAuth();

  const form = useForm<SignUpInput>({
    resolver: zodResolver(signUpInputSchema),
    mode: "onChange",
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: SignUpInput) => {
    try {
      setError("");
      const response = await handleSignUp(data);
      setUser(userMapper(response.user)); //store user data in context
      navigate("/"); //after successful signup, navigate to the home page
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    }
  };


  return (
    <div className="min-h-screen flex items-center justify-center bg-background relative overflow-hidden p-4">
      {/* Background decorations */}
      <div className="absolute top-[20%] right-[-10%] w-[50%] h-[50%] bg-primary/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-20%] left-[-10%] w-[50%] h-[50%] bg-secondary/20 rounded-full blur-[120px] pointer-events-none" />

      <Card className="w-full max-w-md relative z-10 border-border/50 bg-card/60 backdrop-blur-xl shadow-2xl transition-all duration-300 hover:shadow-primary/5">
        <CardHeader className="space-y-2 text-center pb-6">
          <CardTitle className="text-3xl font-bold tracking-tight">Create an account</CardTitle>
          <CardDescription className="text-balance text-muted-foreground">
            Enter your information to get started
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-5">
          {error && <div className="p-3 text-sm text-destructive-foreground bg-destructive/20 rounded-md border border-destructive/50">{error}</div>}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>

                    <div className="relative">
                      <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />

                      <FormControl>
                        <Input
                          placeholder="johndoe"
                          className="pl-10 h-11"
                          {...field}
                        />
                      </FormControl>
                    </div>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>

                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />

                      <FormControl>
                        <Input
                          type="email"
                          placeholder="m@example.com"
                          className="pl-10 h-11"
                          {...field}
                        />
                      </FormControl>
                    </div>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>

                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />

                      <FormControl>
                        <Input
                          type="password"
                          placeholder="••••••••"
                          className="pl-10 h-11"
                          {...field}
                        />
                      </FormControl>
                    </div>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                disabled={!form.formState.isValid || loading}
              >
                {loading ? "Creating account..." : "Create Account"}
              </Button>
            </form>
          </Form>
          <div className="relative py-2">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-border/50" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-muted-foreground/70">
                Or continue with
              </span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">

            <Button variant="outline" className="h-11 bg-background/50 hover:bg-background/80 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24" className="mr-2 h-4 w-4">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" /><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" /><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" /><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
              </svg>
              Google
            </Button>
          </div>
        </CardContent>
        <CardFooter className="flex-col gap-4 text-center">
          <div className="text-sm text-muted-foreground w-full">
            Already have an account?{" "}
            <Link to="/login" className="font-semibold text-primary hover:text-primary/80 hover:underline underline-offset-4 transition-colors">
              Sign in
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}

export default SignUp;
