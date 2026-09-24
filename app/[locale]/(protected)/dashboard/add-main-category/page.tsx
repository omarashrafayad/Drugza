"use client";

import { useState, useRef, ChangeEvent } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { useRouter } from "@/i18n/routing";
import { useCreateMainCategories } from "@/services/MainCategories";
import { useTranslations } from "next-intl";
import { Loader2, FileImage, X } from "lucide-react";

const AddMainCategory = () => {
  const { loading, createMainCategory } = useCreateMainCategories();
  const t = useTranslations("mainCategories");
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [name, setName] = useState("");
  const [arabicName, setArabicName] = useState("");
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleSubmit = async () => {
    if (!name.trim()) {
      toast.error(t("nameRequired"));
      return;
    }
    if (!arabicName.trim()) {
      toast.error(t("arabicNameRequired"));
      return;
    }
    if (!description.trim()) {
      toast.error(t("descriptionRequired"));
      return;
    }

    const formData = new FormData();
    formData.append("Name", name.trim());
    formData.append("ArabicName", arabicName.trim());
    formData.append("Description", description.trim());
    if (imageFile) {
      formData.append("ImageFile", imageFile);
    }

    try {
      const { success, error } = await createMainCategory(formData);

      if (success) {
        toast.success(t("createdSuccess"));
        router.push("/dashboard/main-categories");
      } else {
        toast.error(error || t("creationError"));
      }
    } catch (err: any) {
      toast.error(err?.message || t("creationError"));
    }
  };

  return (
    <div className="grid grid-cols-12 gap-4 rounded-lg">
      <div className="col-span-12">
        <Card>
          <CardHeader className="border-b border-solid border-default-200 mb-6">
            <CardTitle>{t("mainCategoryInformation")}</CardTitle>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="flex items-center flex-wrap gap-2">
              <Label className="w-[180px] flex-none text-sm font-medium" htmlFor="name">
                {t("name")}
              </Label>
              <Input
                id="name"
                className="flex-1 min-w-[300px]"
                placeholder={t("name")}
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="flex items-center flex-wrap gap-2">
              <Label className="w-[180px] flex-none text-sm font-medium" htmlFor="arabicName">
                {t("arabicName")}
              </Label>
              <Input
                id="arabicName"
                className="flex-1 min-w-[300px]"
                placeholder={t("arabicName")}
                value={arabicName}
                onChange={(e) => setArabicName(e.target.value)}
              />
            </div>

            <div className="flex items-start flex-wrap gap-2">
              <Label className="w-[180px] flex-none text-sm font-medium mt-3" htmlFor="description">
                {t("description")}
              </Label>
              <Textarea
                id="description"
                className="flex-1 min-w-[300px]"
                placeholder={t("description")}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
              />
            </div>

            <div className="flex items-center flex-wrap gap-2">
              <Label className="w-[180px] flex-none text-sm font-medium" htmlFor="imageFile">
                {t("image") || "Main Category Image"}
              </Label>
              <div className="flex-1 min-w-[300px] flex items-center gap-3">
                <Button 
                  type="button"
                  variant="outline" 
                  onClick={() => fileInputRef.current?.click()}
                  className="flex gap-2 items-center"
                >
                  <FileImage className="w-4 h-4" />
                  {t("chooseFile") || "Choose File"}
                </Button>
                
                <span className="text-sm text-muted-foreground truncate max-w-[200px]">
                  {imageFile ? imageFile.name : (t("noFileChosen") || "No file chosen")}
                </span>

                {imageFile && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => setImageFile(null)}
                    className="text-destructive h-8 px-2 text-xs hover:bg-destructive/10"
                  >
                    <X className="w-3.5 h-3.5 mr-1" />
                    Remove
                  </Button>
                )}

                <input
                  ref={fileInputRef}
                  id="imageFile"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="col-span-12 flex justify-end gap-3 mt-2">
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push("/dashboard/main-categories")}
        >
          {t("cancel")}
        </Button>
        <Button onClick={handleSubmit} disabled={loading} className="gap-2">
          {loading && <Loader2 className="w-4 h-4 animate-spin" />}
          {t("save")}
        </Button>
      </div>
    </div>
  );
};

export default AddMainCategory;
