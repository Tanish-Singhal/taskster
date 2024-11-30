"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { Separator } from "@/components/ui/separator";
import { deleteAccount } from "@/store/slices/userSlice/userSlice";
import { RootState, AppDispatch } from "@/store/store";
import { ProfileForm } from "./components/ProfileForm";
import { DangerZone } from "./components/DangerZone";

export default function SettingsPage() {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const { user, loading } = useSelector((state: RootState) => state.user);
  const router = useRouter();

  const handleDeleteAccount = async (password: string) => {
    try {
      await dispatch(deleteAccount(password)).unwrap();
      toast.success("Account deleted successfully", {
        style: {
          borderRadius: "5px",
          background: "#262626",
          color: "#ffffff",
        },
      });
      router.push("/signup");
    } catch {
      toast.error("Failed to delete account", {
        style: {
          borderRadius: "5px",
          background: "#262626",
          color: "#ffffff",
        },
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-0.5">
        <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
        <p className="text-muted-foreground">
          Manage your account settings and preferences.
        </p>
      </div>
      <Separator />

      <div className="grid gap-6">
        <ProfileForm user={user} loading={loading} />
        <DangerZone
          showDeleteDialog={showDeleteDialog}
          setShowDeleteDialog={setShowDeleteDialog}
          onDeleteAccount={handleDeleteAccount}
          loading={loading}
        />
      </div>
    </div>
  );
}