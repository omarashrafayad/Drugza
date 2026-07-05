"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import GetCategories from "@/services/categories/getCategories";
import useGetBrands from "@/services/brands/getAllBrands"; 
import { Loader2, X } from "lucide-react";
import useCreateProduct from "@/services/products/createProduct";
import { toast } from "sonner";
import { useRouter } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import GetSubCategories from "@/services/subcategories/getSubCategories";

const AddProduct = () => {
  const t = useTranslations("productList");
  const router = useRouter();

  const [Name, setName] = useState<string>("");
  const [Description, setDescription] = useState<string>("");
  const [SubCategoryId, setSubCategoryId] = useState<string>("");
  const [brandId, setBrandId] = useState<string>("");
  const [ProductImage, setProductImage] = useState<File[]>([]);
  const [Price, setPrice] = useState<number>(0);
    const [sku, setSku] = useState<string>("");
  const [SubCategorySearch, setSubCategorySearch] = useState<string>("");
  const [filteredCategories, setFilteredCategories] = useState<any[]>([]);
  const [brandSearch, setBrandSearch] = useState<string>("");
  const [filteredBrands, setFilteredBrands] = useState<any[]>([]);

  const { loading: gettingAllSubCatLoading, data: subCategoriesData, gettingAllSubCategories } = GetSubCategories();
  const { loading: gettingBrandsLoading, brands, getAllBrands } = useGetBrands();
  const { createProduct, loading: creatingProductLoading } = useCreateProduct();

  useEffect(() => {
    gettingAllSubCategories();
    getAllBrands();
  }, []);

  useEffect(() => {
    if (subCategoriesData) {
      const filtered = subCategoriesData.filter((category: any) =>
        category.name.toLowerCase().includes(SubCategorySearch.toLowerCase())
      );
      setFilteredCategories(filtered);
    }
  }, [SubCategorySearch, subCategoriesData]);

  useEffect(() => {
    if (brands) {
      const filtered = brands.filter((brand: any) =>
        brand.name.toLowerCase().includes(brandSearch.toLowerCase())
      );
      setFilteredBrands(filtered);
    }
  }, [brandSearch, brands]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setProductImage((prev) => [...prev, ...newFiles]);
    }
  };

  const removePhoto = (index: number) => {
    setProductImage((prev) => prev.filter((_, i) => i !== index));
  };

  const onSubmit = async () => {
    if (!Name.trim() || !SubCategoryId || !brandId) {
      toast.error(t("fillRequiredFields"));
      return;
    }

    const formData = new FormData();
    formData.append("Name", Name);
    formData.append("Description", Description);
    formData.append("SubCategoryId", SubCategoryId);
    formData.append("BrandId", brandId);
    formData.append("Price", Price.toString());
    formData.append("sku", sku.toString());

    if (ProductImage.length === 1) {
      formData.append("ProductImage", ProductImage[0]);
    } else if (ProductImage.length > 1) {
      ProductImage.forEach((file) => {
        formData.append("ProductImages", file);
      });
    }
    try {
      const success = await createProduct(formData);
      if (success) {
        toast.success(t("productCreated"));
        router.push("/dashboard/product-list");
      }
    } catch (error) {
      toast.error(t("productCreationError"));
    }
  };

  if (gettingAllSubCatLoading || gettingBrandsLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Loader2 className="animate-spin" size={40} />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-12 gap-4 rounded-lg">
      <div className="col-span-12 space-y-4">
        <Card>
          <CardHeader className="border-b border-solid border-default-200 mb-6">
            <CardTitle>{t("productDetails")}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div >
                <Label className="w-[120px]">{t("productName")}</Label>
                <Input value={Name} onChange={(e) => setName(e.target.value)} />
              </div>
              <div>
                <Label className="w-[120px]">{t("price")}</Label>
                <Input value={Price} onChange={(e) => setPrice(Number(e.target.value))} />
              </div>
            </div>


            {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <Label className="w-[120px]">{t("productPref")}</Label>
                <Input value={preef} onChange={(e) => setPref(e.target.value)} />
              </div>
              <div className="flex items-center gap-2">
                <Label className="w-[120px]">Arabic Preef</Label>
                <Input value={arabicPreef} onChange={(e) => setArabicPreef(e.target.value)} />
              </div>
            </div> */}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label className="w-[120px]">{t("category")}</Label>
                <Select onValueChange={(value) => setSubCategoryId(value)}>
                  <SelectTrigger className="flex-1">
                    <SelectValue placeholder={t("selectCategoryPlaceholder")} />
                  </SelectTrigger>
                  <SelectContent>
                    <div className="px-2 py-1">
                      <Input placeholder={t("searchCategory")} onChange={(e) => setSubCategorySearch(e.target.value)} />
                    </div>
                    <SelectGroup>
                      {filteredCategories.map((category: any) => (
                        <SelectItem key={category.id} value={category.id}>{category.name}</SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div >
                <Label className="w-[120px]">{t("sku")}</Label>
                <Input value={sku} onChange={(e) => setSku(e.target.value)} />
              </div>

              <div>
                <Label className="w-[120px]">{t("brand")}</Label>
                <Select onValueChange={(value) => setBrandId(value)}>
                  <SelectTrigger className="flex-1">
                    <SelectValue placeholder={t("selectBrandPlaceholder")} />
                  </SelectTrigger>
                  <SelectContent>
                    <div className="px-2 py-1">
                      <Input
                        placeholder={t("searchBrand")} 
                        onChange={(e) => setBrandSearch(e.target.value)} 
                      />
                    </div>
                    <SelectGroup>
                      {filteredBrands.map((brand: any) => (
                        <SelectItem key={brand.id} value={brand.id.toString()}>{brand.name}</SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
                          <div>
                  <Label className="w-[120px]">{t("productPhoto")}</Label>
                  <Input 
                    type="file" 
                    accept="image/*" 
                    multiple
                    onChange={handleFileChange} 
                  />
                </div>
            
                {ProductImage.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2 ml-[120px]">
                    {ProductImage.map((file, index) => (
                      <div key={index} className="relative group bg-slate-100 p-1 rounded border">
                        <span className="text-xs truncate max-w-[100px] block">{file.name}</span>
                        <button 
                          onClick={() => removePhoto(index)}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X size={12} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
            </div>

            {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <Label className="w-[120px]">Revenue Percentage (%)</Label>
                <Input type="number" value={revenuePercentage} onChange={(e) => setRevenuePercentage(e.target.value)} />
              </div>
              <div className="flex items-center gap-2">
                <Label className="w-[120px]">{t("orderNum")}</Label>
                <Input type="number" value={orderNum} onChange={(e) => setOrderNum(e.target.value)} />
              </div>
            </div> */}

            <div className="space-y-2">
              <Label>{t("description")}</Label>
              <Textarea value={Description} onChange={(e) => setDescription(e.target.value)} />
            </div>
            {/* <div className="space-y-2">
              <Label>Arabic Description</Label>
              <Textarea value={arabicDescription} onChange={(e) => setArabicDescription(e.target.value)} />
            </div> */}

            {/* <div className="flex items-center gap-2 pt-4">
              <Switch 
                id="isPopular" 
                checked={isPopular} 
                onCheckedChange={setIsPopular} 
              />
              <Label htmlFor="isPopular" className="cursor-pointer font-semibold">
                {t("isPopular")}
              </Label>
            </div> */}

          </CardContent>
        </Card>
      </div>

      <div className="col-span-12 flex justify-end">
        <Button onClick={onSubmit} disabled={creatingProductLoading}>
          {creatingProductLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : t("save")}
        </Button>
      </div>
    </div>
  );
};

export default AddProduct;