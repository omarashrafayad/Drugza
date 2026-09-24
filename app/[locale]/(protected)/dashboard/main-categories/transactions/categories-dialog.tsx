"use client";

import { useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Loader2, Layers, FolderX } from "lucide-react";
import { useGetMainCategoryCategories } from "@/services/MainCategories";
import { MainCategory } from "@/types/mainCategory";
import { useTranslations } from "next-intl";

interface CategoriesDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mainCategory: MainCategory | null;
}

export function CategoriesDialog({
  open,
  onOpenChange,
  mainCategory,
}: CategoriesDialogProps) {
  const t = useTranslations("mainCategories");
  const { categories, loading, getMainCategoryCategories } =
    useGetMainCategoryCategories();

  useEffect(() => {
    if (open && mainCategory?.id) {
      getMainCategoryCategories(mainCategory.id);
    }
  }, [open, mainCategory, getMainCategoryCategories]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[85vh] flex flex-col">
        <DialogHeader className="border-b pb-3">
          <DialogTitle className="flex items-center gap-2 text-lg font-semibold">
            <Layers className="w-5 h-5 text-primary" />
            <span>
              {t("subCategories")}: {mainCategory?.name}
              {mainCategory?.arabicName ? ` (${mainCategory.arabicName})` : ""}
            </span>
          </DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto py-4">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-12 gap-2">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
              <p className="text-sm text-muted-foreground">Loading sub-categories...</p>
            </div>
          ) : categories && categories.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {categories.map((cat: any) => (
                <div
                  key={cat.id}
                  className="p-4 rounded-lg border border-default-200 bg-card hover:border-primary/50 transition-colors shadow-sm"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h4 className="font-semibold text-base text-foreground">
                        {cat.name}
                      </h4>
                      {cat.arabicName && (
                        <p className="text-sm text-muted-foreground mt-0.5">
                          {cat.arabicName}
                        </p>
                      )}
                    </div>
                    {cat.orderNum !== undefined && cat.orderNum !== null && (
                      <span className="text-xs bg-default-100 px-2 py-0.5 rounded text-default-600 font-mono">
                        #{cat.orderNum}
                      </span>
                    )}
                  </div>
                  {cat.pref && (
                    <p className="text-xs text-muted-foreground mt-2 line-clamp-2">
                      {cat.pref}
                    </p>
                  )}
                  {cat.description && (
                    <p className="text-xs text-default-500 mt-1 line-clamp-2">
                      {cat.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center text-muted-foreground gap-2">
              <FolderX className="w-12 h-12 stroke-[1.5] text-muted-foreground/60" />
              <p className="text-sm">{t("noSubCategories")}</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default CategoriesDialog;
