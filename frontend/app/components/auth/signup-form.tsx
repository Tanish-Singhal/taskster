"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema, SignupSchema } from "@/lib/schema/signup-schema";
import { Eye, EyeClosed } from "lucide-react";
import { toast } from "react-hot-toast";

export function SignupForm() {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<SignupSchema>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async (data: SignupSchema) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_DEVELOPMENT_URL}/api/v1/auth/signup`,
        {
          username: data.username,
          email: data.email,
          password: data.password,
        }
      );

      const token = response.data.token;
      localStorage.setItem("taskster-token", token);

      reset();

      toast.success("Account Created Successfully!", {
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
        <CardTitle className="text-2xl">Create an account</CardTitle>
        <CardDescription>Enter your email below to create your account</CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="text">Username</Label>
              <Input
                {...register("username", {
                  required: "This field is required",
                })}
                id="text"
                type="text"
                placeholder="Trevor"
              />
              {errors.username && (
                <p className="text-red-500 text-sm">{`${errors.username.message}`}</p>
              )}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                {...register("email", {
                  required: "This field is required",
                })}
                id="email"
                type="email"
                placeholder="m@example.com"
              />
              {errors.email && <p className="text-red-500 text-sm">{`${errors.email.message}`}</p>}
            </div>

            <div className="grid gap-2 relative">
              <Label htmlFor="password">Password</Label>

              <div className="relative">
                <Input
                  {...register("password", {
                    required: "This field is required",
                  })}
                  id="password"
                  type={showPassword ? "text" : "password"}
                />
                <button
                  type="button"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? <EyeClosed /> : <Eye />}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm">{`${errors.password.message}`}</p>
              )}
            </div>

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Creating Account..." : "Create Account"}
            </Button>
          </div>
        </form>

        <div className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <Link href="/signin" className="underline">
            Sign in
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
