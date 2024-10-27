"use client";

import { AppSidebar } from "@/components/app-sidebar";
// import {
//   Breadcrumb,
//   BreadcrumbItem,
//   BreadcrumbLink,
//   BreadcrumbList,
// } from "@/components/ui/breadcrumb";
// import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import StoreProvider from "@/store/StoreProvider";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function HomeLayout({ children }: { children: React.ReactNode }) {  
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("taskster-token");

    if (!token) {
      router.push("/signin");
    }
  }, [router]);

  return (
    <StoreProvider>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset className="overflow-x-hidden overflow-y-hidden">
          <header className="flex h-16 shrink-0 items-center gap-2">
            <div className="flex items-center gap-2 px-4">
              <SidebarTrigger className="-ml-1" />
              {/* <Separator orientation="vertical" className="mr-2 h-4" />
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem className="hidden md:block">
                    <BreadcrumbLink href="#">Dashboard</BreadcrumbLink>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb> */}
            </div>
          </header>
          <div className="px-6 md:px-8">{children}</div>
        </SidebarInset>
      </SidebarProvider>
    </StoreProvider>
  );
}
