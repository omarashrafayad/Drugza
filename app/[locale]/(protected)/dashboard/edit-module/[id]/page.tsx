"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import {useRouter} from "@/i18n/routing";
import {useParams} from "next/navigation";
import useUpdateMainCategory from "@/services/MainCategories/updateMainCategory";
import useGettingMainCategoryById from "@/services/MainCategories/gettingMainCategoryById";
import {Loader2} from "lucide-react";
import gettingMainCategoryById from "@/services/MainCategories/gettingMainCategoryById";
import { useTranslations } from "next-intl";


const EditModule = () => {
  // update Module
  const {loading, error, updateMainCategory} = useUpdateMainCategory()

  const t = useTranslations("Module");

  // getting module by id
  const {loading: loadingMainCategory, error: errorMainCategory, mainCategory, getMainCategory} = useGettingMainCategoryById()

  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;

  const [name, setName] = useState("");
  const [arabicName, setArabicName] = useState("");
  const [description, setDescription] = useState("");


  const updateModule = async () => {
    if (!name.trim()) {
      toast.error(t("validationError"), { description: t("moduleNameValidation") });
      return;
    }
    if (!arabicName.trim()) {
      toast.error(t("validationError"), { description: t("arabicNameValidation") });
      return;
    }
    if (!description.trim()) {
      toast.error(t("validationError"), { description: t("moduleDescriptionValidation") });
      return;
    }

    try {
      const {success, error} = await updateMainCategory(id,{name,arabicName, description});

      if (success) {
        toast.success(t("moduleUpdated"));
        setTimeout(() => {
          router.push("/dashboard/modules");
        }, 1000);
      }
      if (error) {
          throw error;
      }
    } catch (error: any) {
      toast.error(t("moduleUpdateError"));
    }
  };

  useEffect(() => {
    getMainCategory(id);
  }, []);

  useEffect(() => {
    if (mainCategory) {
      setName(mainCategory.name || "");
      setArabicName(mainCategory.arabicName || "");
      setDescription(mainCategory.description || "");
    }
  }, [mainCategory]);

  if (loadingMainCategory) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="animate-spin h-8 w-8 text-gray-500" />
      </div>
    );
  }

  return (
      <div className="grid grid-cols-12 gap-4 rounded-lg">
        <div className="col-span-12">
          <Card>
            <CardHeader className="border-b border-solid border-default-200 mb-6">
              <CardTitle>{t("editModule")}</CardTitle>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="flex items-center flex-wrap">
                <Label className="w-[150px] flex-none" htmlFor="moduleName">
                  {t("moduleName")}
                </Label>
                <Input
                    id="moduleName"
                    type="text"
                    placeholder={t("moduleName")}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
              </div>
            </CardContent>

            <CardContent className="space-y-4">
              <div className="flex items-center flex-wrap">
                <Label className="w-[150px] flex-none" htmlFor="arabicModuleName">
                  {t("arabicName")}
                </Label>
                <Input
                    id="arabicModuleName"
                    type="text"
                    placeholder={t("arabicName")}
                    value={arabicName}
                    onChange={(e) => setArabicName(e.target.value)}
                />
              </div>
            </CardContent>

            <CardContent className="space-y-4">
              <div className="flex items-center flex-wrap">
                <Label className="w-[150px] flex-none" htmlFor="Description">
                  {t("moduleDescription")}
                </Label>
                <Textarea
                    id="Description"
                    placeholder={t("moduleDescription")}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="col-span-12 flex justify-center">
          <Button onClick={updateModule} disabled={loading}>
            {loading ? `${t("updatingModule")}...` : t("updateModule")}
          </Button>
        </div>
      </div>
  );
};

export default EditModule;