"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { useRouter } from "@/i18n/routing";
import useCreateMainCategories from "@/services/MainCategories/createMainCategories";
import { useTranslations } from "next-intl";

const AddModule = () => {
  const {loading, createMainCategory} = useCreateMainCategories()
  const t = useTranslations("Module");

  const router = useRouter();

  const [name, setName] = useState("");
  const [arabicName, setArabicName] = useState("");
  const [description, setDescription] = useState("");

  const addModule = async () => {
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
      const {success, error} = await createMainCategory({name,arabicName, description});
      if (success) {
        toast.success(t("moduleCreated"));
        setTimeout(() => {
          router.push("/dashboard/modules");
        }, 1000);
      }
        if (error) {
            throw error;
        }
    } catch (error: any) {
      toast.error(t("moduleCreationError"));
    }
  };

  return (
      <div className="grid grid-cols-12 gap-4 rounded-lg">
        <div className="col-span-12">
          <Card>
            <CardHeader className="border-b border-solid border-default-200 mb-6">
              <CardTitle>{t("moduleInformation")}</CardTitle>
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
                <Label className="w-[150px] flex-none" htmlFor="moduleArabicName">
                  {t("arabicName")}
                </Label>
                <Input
                    id="moduleArabicName"
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
          <Button onClick={addModule} disabled={loading}>
            {loading ? "Loading..." : t("addModule")}
          </Button>
        </div>
      </div>
  );
};

export default AddModule;