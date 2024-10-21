"use client";

import { LoginForm } from "@/app/components/auth/login-form";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Page() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("taskster-token");

    if (token) {
      router.push("/dashboard");
    }
  }, [router]);

  return (
    <div className="flex h-screen w-full items-center justify-center px-4">
      <LoginForm />
    </div>
  );
}
