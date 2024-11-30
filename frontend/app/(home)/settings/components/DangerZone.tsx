
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import DeleteAccountDialog from "@/app/components/auth/DeleteAccountDialog";

interface DangerZoneProps {
  showDeleteDialog: boolean;
  setShowDeleteDialog: (show: boolean) => void;
  onDeleteAccount: (password: string) => void;
  loading: boolean;
}

export const DangerZone = ({
  showDeleteDialog,
  setShowDeleteDialog,
  onDeleteAccount,
  loading,
}: DangerZoneProps) => {
  return (
    <>
      <Card className="bg-sidebar border-red-700">
        <CardHeader>
          <CardTitle className="text-red-700">Danger Zone</CardTitle>
          <CardDescription>
            Permanently delete your account and all associated data.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button
            type="button"
            className="bg-red-600 text-white hover:bg-red-700 focus:text-white"
            onClick={() => setShowDeleteDialog(true)}
          >
            Delete Account
          </Button>
        </CardContent>
      </Card>

      <DeleteAccountDialog
        isOpen={showDeleteDialog}
        onOpenChange={setShowDeleteDialog}
        onConfirm={onDeleteAccount}
        isLoading={loading}
      />
    </>
  );
};