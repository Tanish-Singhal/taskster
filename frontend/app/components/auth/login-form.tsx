"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Eye, EyeClosed } from "lucide-react";
import { useForm } from "react-hook-form";
import { signinSchema, SigninSchema } from "@/lib/schema/signin-schema";
import { zodResolver } from "@hookform/resolvers/zod";

export function LoginForm() {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<SigninSchema>({
    resolver: zodResolver(signinSchema),
  });

  const onSubmit = async (data: SigninSchema) => {
    console.log("Form data submitted:", data);

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_DEVELOPMENT_URL}/api/v1/auth/signin`,
        {
          email: data.email,
          password: data.password,
        }
      );

      const token = response.data.token;
      localStorage.setItem("token", token);

      reset();

      toast.success("Account LoggedIn Successfully!", {
        style: {
          borderRadius: "5px",
          background: "#262626",
          color: "#ffffff",
        },
      });

      setTimeout(() => {
        router.push("/dashboard");
      }, 1000);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        toast.error(error.response.data.message, {
          style: {
            borderRadius: "10px",
            background: "#171717",
            color: "#ffffff",
          },
        });
      } else {
        toast.error("Something went wrong", {
          style: {
            borderRadius: "10px",
            background: "#171717",
            color: "#ffffff",
          },
        });
      }
    }
  };

  return (
    <Card className="mx-auto max-w-sm dark:bg-neutral-900">
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>Enter your email below to login to your account</CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                {...register("email", {
                  required: "This field is required",
                })}
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{`${errors.email.message}`}</p>
              )}
            </div>

            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <Link href="#" className="ml-auto inline-block text-sm underline">
                  Forgot your password?
                </Link>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  {...register("password", {
                    required: "This field is required",
                  })}
                />
                <button
                  type="button"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2"
                  onClick={() => {
                    setShowPassword(!showPassword);
                  }}
                >
                  {showPassword ? <EyeClosed /> : <Eye />}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm">{`${errors.password.message}`}</p>
              )}
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Logging In..." : "Login"}
            </Button>
          </div>
        </form>

        <div className="mt-4 text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="underline">
            Sign up
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
