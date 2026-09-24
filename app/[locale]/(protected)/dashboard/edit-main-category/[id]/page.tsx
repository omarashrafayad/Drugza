"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { useRouter } from "@/i18n/routing";
import { useParams } from "next/navigation";
import {
  useUpdateMainCategory,
  useGettingMainCategoryById,
} from "@/services/MainCategories";
import { Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";

const EditMainCategory = () => {
  const t = useTranslations("mainCategories");
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;

  const { loading: updating, updateMainCategory } = useUpdateMainCategory();
  const {
    loading: fetching,
    mainCategory,
    getMainCategory,
  } = useGettingMainCategoryById();

  const [name, setName] = useState("");
  const [arabicName, setArabicName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (id) {
      getMainCategory(id);
    }
  }, [id]);

  useEffect(() => {
    if (mainCategory) {
      setName(mainCategory.name || "");
      setArabicName(mainCategory.arabicName || "");
      setDescription(mainCategory.description || "");
    }
  }, [mainCategory]);

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

    try {
      const result = await updateMainCategory(id, {
        name: name.trim(),
        arabicName: arabicName.trim(),
        description: description.trim(),
      });

      if (result.success) {
        toast.success(t("updatedSuccess"));
        router.push("/dashboard/main-categories");
      } else {
        toast.error(result.error || t("updateError"));
      }
    } catch (err: any) {
      toast.error(err?.message || t("updateError"));
    }
  };

  if (fetching) {
    return (
      <div className="flex justify-center items-center h-[400px]">
        <Loader2 className="animate-spin h-8 w-8 text-primary" />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-12 gap-4 rounded-lg">
      <div className="col-span-12">
        <Card>
          <CardHeader className="border-b border-solid border-default-200 mb-6">
            <CardTitle>{t("editMainCategory")}</CardTitle>
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
        <Button onClick={handleSubmit} disabled={updating} className="gap-2">
          {updating && <Loader2 className="w-4 h-4 animate-spin" />}
          {t("update")}
        </Button>
      </div>
    </div>
  );
};

export default EditMainCategory;
