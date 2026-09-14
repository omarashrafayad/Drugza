"use client";

import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { useCreateActiveIngredient, useUpdateActiveIngredient } from "@/services/ActiveIngerients";
import { toast } from "sonner";
import { ActiveIngredient } from "@/types/activeIngredient";
import { useTranslations } from "next-intl";

interface AddActiveIngredientDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
  editData?: ActiveIngredient | null;
}

export function AddActiveIngredientDialog({
  open,
  onOpenChange,
  onSuccess,
  editData,
}: AddActiveIngredientDialogProps) {
  const t = useTranslations("activeIngredients");
  const { createActiveIngredient, loading: createLoading } = useCreateActiveIngredient();
  const { updateActiveIngredient, loading: updateLoading } = useUpdateActiveIngredient();

  const [name, setName] = useState<string>("");
  const [isMeltable, setIsMeltable] = useState<boolean>(false);

  useEffect(() => {
    if (editData) {
      setName(editData.name || "");
      setIsMeltable(Boolean(editData.isMeltable));
    } else {
      setName("");
      setIsMeltable(false);
    }
  }, [editData, open]);

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    const trimmedName = name.trim();
    if (!trimmedName) {
      toast.error(t("fillAllFields") || "Please fill all fields.");
      return;
    }

    try {
      if (editData) {
        await updateActiveIngredient(editData.id, {
          name: trimmedName,
          isMeltable,
        });
        toast.success(t("activeIngredientUpdated") || "Updated successfully");
      } else {
        await createActiveIngredient({
          name: trimmedName,
          isMeltable,
        });
        toast.success(t("activeIngredientCreated") || "Created successfully");
      }

      onOpenChange(false);
      if (onSuccess) onSuccess();
      setName("");
      setIsMeltable(false);
    } catch (error: any) {
      toast.error(
        error?.message ||
          (editData
            ? t("activeIngredientUpdateError") || "Update failed"
            : t("activeIngredientCreationError") || "Creation failed")
      );
    }
  };

  const loading = createLoading || updateLoading;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[480px] p-0 overflow-hidden border border-default-200 shadow-2xl rounded-2xl">
        <DialogHeader className="p-6 pb-2 border-b border-default-200">
          <DialogTitle className="text-xl font-bold text-default-900">
            {editData ? t("editIngredient") || "Edit Ingredient" : t("addIngredient") || "Add Ingredient"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="space-y-2">
            <Label htmlFor="ingredient-name" className="text-sm font-medium text-default-800">
              {t("ingredientName") || "Ingredient Name"} <span className="text-destructive">*</span>
            </Label>
            <Input
              id="ingredient-name"
              placeholder={t("namePlaceholder") || "Enter ingredient name"}
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={loading}
              autoFocus
              className="h-10"
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={loading}
            >
              {t("cancel") || "Cancel"}
            </Button>
            <Button
              type="submit"
              disabled={loading || !name.trim()}
              className="min-w-[100px]"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {t("loading_") || "Loading..."}
                </>
              ) : (
                editData ? (t("updateActiveIngredient") || "Update") : (t("save") || "Save")
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default AddActiveIngredientDialog;
