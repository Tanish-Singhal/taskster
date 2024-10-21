"use client";

import Dashboard from '@/app/components/dashboard/dashboard';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'

const page = () => {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("taskster-token");

    if (!token) {
      router.push("/signin");
    }
  }, [router]);

  return (
    <div>
      <Dashboard />
    </div>
  )
}

export default page