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
                className="w-full"
              >
                {loading ? "Creating account..." : "Create Account"}
              </Button>
            </form>
          </Form>

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
