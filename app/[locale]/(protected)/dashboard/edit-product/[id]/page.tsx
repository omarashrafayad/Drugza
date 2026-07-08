"use client";

import { useEffect, useState, ChangeEvent, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { useParams } from "next/navigation";
import { useRouter } from "@/i18n/routing";
import { toast } from "sonner";
import { Loader2, Upload, FileImage, X } from "lucide-react";
import { useTranslations } from "next-intl";
import Cookies from "js-cookie";
import useGettingProductById from "@/services/products/gettingProductById";
import GetCategories from "@/services/categories/getCategories";
import useUpdateProductById from "@/services/products/UpdateProductById";
import GetSubCategories from "@/services/subcategories/getSubCategories";

const EditProduct = () => {
  const t = useTranslations("productList");
  const router = useRouter();
  const params = useParams();
  const productId = params?.id as string;
  const fileInputRef = useRef<HTMLInputElement>(null);

  const userRole = Cookies.get("userRole");
  const isInventory = userRole?.toLowerCase() === "inventory";

  const { getProductById, product, loading } = useGettingProductById();
  const { data: subCategories, gettingAllSubCategories, loading: catsLoading } = GetSubCategories();
  const { updatingProductById, loading: updateLoading } = useUpdateProductById();

  const [formData, setFormData] = useState({
    Name: "",
    Description: "",
    SubCategoryId: "",
    ProductImage: [] as File[],
    Price: "",
    BrandId: "",
    IsPopular:false,
    sku: "",
  });

  useEffect(() => {
    gettingAllSubCategories();
    if (productId) getProductById(productId);
  }, [productId]);
useEffect(() => {
  if (product) {
    setFormData({
      Name: product.name || "",
      Description: product.description || "",
      SubCategoryId: product.subCategoryId ? String(product.subCategoryId) : "",
      ProductImage: [],
      sku: product.sku || "",
      Price: product.price ? String(product.price) : "",
      BrandId: product.brandId ? String(product.brandId) : "",
      IsPopular:product.isPopular || false,
    });
  }
}, [product]);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setFormData((prev) => ({
        ...prev,
        ProductImage: [...prev.ProductImage, ...newFiles],
      }));
    }
  };

  const removeNewImage = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      ProductImage: prev.ProductImage.filter((_, i) => i !== index),
    }));
  };

  const handleUpdate = async () => {
    if (!formData.Name || !formData.SubCategoryId) {
      toast.error(t("fill_all_fields"));
      return;
    }

    const data = new FormData();
    data.append("Name", formData.Name);
    data.append("Description", formData.Description);
    data.append("SubCategoryId", formData.SubCategoryId);
    data.append("BrandId", formData.BrandId);
    data.append("Price", formData.Price);
    data.append("sku", formData.sku);
    data.append("IsPopular", formData.IsPopular.toString());

    if (formData.ProductImage.length > 0) {
      if (formData.ProductImage.length === 1) {
        data.append("ProductImage", formData.ProductImage[0]);
      } else {
        formData.ProductImage.forEach((file) => {
          data.append("ProductImages", file);
        });
      }
    }

    try {
      const response = await (updatingProductById as any)(productId, data);
      if (response) {
        toast.success(t("Product updated successfully"));
        router.push('/dashboard/product-list');
      }
    } catch (error) {
      toast.error(t("productUpdateError"));
    }
  };

  if (loading || catsLoading) {
    return (
      <div className="flex items-center justify-center h-[400px]">
        <Loader2 className="animate-spin h-8 w-8 text-primary" />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-12 gap-4 rounded-lg">
      <div className="col-span-12">
        <Card>
          <CardHeader className="border-b border-default-200 mb-6">
            <CardTitle>{t("productDetails")}</CardTitle>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="flex items-center flex-wrap gap-2">
              <Label className="w-[180px] flex-none text-sm font-medium">{t("productName")}</Label>
              <Input 
                className="flex-1 min-w-[300px]"
                value={formData.Name} 
                onChange={(e) => setFormData({...formData, Name: e.target.value})} 
                disabled={isInventory}
              />
            </div>

            {/* <div className="flex items-center flex-wrap gap-2">
              <Label className="w-[180px] flex-none text-sm font-medium">{t("arabicName")}</Label>
              <Input 
                className="flex-1 min-w-[300px]"
                value={formData.arabicName} 
                onChange={(e) => setFormData({...formData, arabicName: e.target.value})} 
                disabled={isInventory}
              />
            </div> */}

            {/* <div className="flex items-center flex-wrap gap-2">
              <Label className="w-[180px] flex-none text-sm font-medium">{t("productPref")}</Label>
              <Input 
                className="flex-1 min-w-[300px]"
                value={formData.pref} 
                onChange={(e) => setFormData({...formData, pref: e.target.value})} 
                disabled={isInventory}
              />
            </div> */}

            {/* <div className="flex items-center flex-wrap gap-2">
              <Label className="w-[180px] flex-none text-sm font-medium">{t("arabicPreef")}</Label>
              <Input 
                className="flex-1 min-w-[300px]"
                value={formData.arabicPreef} 
                onChange={(e) => setFormData({...formData, arabicPreef: e.target.value})} 
                disabled={isInventory}
              />
            </div> */}

            <div className="flex items-center flex-wrap gap-2">
              <Label className="w-[180px] flex-none text-sm font-medium">{t("category")}</Label>
              <Select 
                value={formData.SubCategoryId} 
                onValueChange={(val) => setFormData({...formData, SubCategoryId: val})}
                disabled={isInventory}
              >
                <SelectTrigger className="flex-1 min-w-[300px]">
                  <SelectValue placeholder={t("selectCategory")} />
                </SelectTrigger>
                <SelectContent>
                  {subCategories.map((cat: any) => (
                    <SelectItem key={cat.id} value={String(cat.id)}>{cat.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* <div className="flex items-center flex-wrap gap-2">
              <Label className="w-[180px] flex-none text-sm font-medium">{t("revenuePercentage")}</Label>
              <Input 
                type="number"
                className="flex-1 min-w-[300px]"
                value={formData.revenuePercentage} 
                onChange={(e) => setFormData({...formData, revenuePercentage: e.target.value})} 
              />
            </div> */}

            <div className="flex items-center flex-wrap gap-2">
              <Label className="w-[180px] flex-none text-sm font-medium">{t("price")}</Label>
              <Input 
                type="number"
                className="flex-1 min-w-[300px]"
                value={formData.Price} 
                onChange={(e) => setFormData({...formData, Price: e.target.value})} 
              />
            </div>
            <div className="flex items-center flex-wrap gap-2">
              <Label className="w-[180px] flex-none text-sm font-medium">{t("sku")}</Label>
              <Input 
                type="text"
                className="flex-1 min-w-[300px]"
                value={formData.sku} 
                onChange={(e) => setFormData({...formData, sku: e.target.value})} 
              />
            </div>

            <div className="flex items-start flex-wrap gap-2">
              <Label className="w-[180px] flex-none text-sm font-medium mt-3">{t("description")}</Label>
              <Textarea 
                className="flex-1 min-w-[300px]"
                value={formData.Description} 
                onChange={(e) => setFormData({...formData, Description: e.target.value})} 
                disabled={isInventory}
              />
            </div>

            {/* <div className="flex items-start flex-wrap gap-2">
              <Label className="w-[180px] flex-none text-sm font-medium mt-3">{t("arabicDescription")}</Label>
              <Textarea 
                className="flex-1 min-w-[300px]"
                value={formData.arabicDescription} 
                onChange={(e) => setFormData({...formData, arabicDescription: e.target.value})} 
                disabled={isInventory}
              />
            </div> */}

            {/* <div className="flex items-center gap-2 pt-4">
              <Switch 
                id="isPopular" 
                checked={formData.isPopular} 
                onCheckedChange={(val) => setFormData({...formData, isPopular: val})} 
                disabled={isInventory}
              />
              <Label htmlFor="isPopular" className="cursor-pointer font-semibold">
                {t("isPopular")}
              </Label>
            </div> */}

            {/* {formData.ProductImage.length > 0 && (
              <div className="flex items-start flex-wrap gap-2">
                <Label className="w-[180px] flex-none text-sm font-medium mt-2">Current Photos</Label>
                <div className="flex flex-wrap gap-2">
                  {formData.ProductImage.map((url, idx) => (
                    <div key={idx} className="relative w-24 h-24 border rounded-md overflow-hidden bg-muted group">
                      <img src={url} alt="product" className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <button
                          type="button"
                          onClick={() => {
                            const fileName = url.split('/').pop() || url;
                            setFormData(prev => ({
                              ...prev,
                              ProductImage: prev.ProductImage.filter(img => img !== url),
                              imageToDelete: [...prev.ProductImage, fileName]
                            }));
                          }}
                          className="bg-destructive text-white p-1 rounded-full hover:bg-destructive/90 disabled:opacity-50 disabled:cursor-not-allowed"
                          title="Delete"
                          disabled={isInventory}
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )} */}

            <div className="flex items-start flex-wrap gap-2">
              <Label className="w-[180px] flex-none text-sm font-medium mt-2">{t("productPhoto")}</Label>
              <div className="flex-1 min-w-[300px] space-y-4">
                <div className="flex items-center gap-3">
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isInventory}
                    className="bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <FileImage className="w-4 h-4 mr-2" />
                    {t("chooseFile") || "Upload Photos"}
                  </Button>
                  <input 
                    type="file" 
                    ref={fileInputRef} 
                    className="hidden" 
                    accept="image/*" 
                    multiple 
                    onChange={handleFileChange} 
                  />
                </div>

                {formData.ProductImage.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {formData.ProductImage.map((file, index) => (
                      <div key={index} className="relative w-24 h-24 border rounded-md group">
                        <img 
                          src={URL.createObjectURL(file)} 
                          className="w-full h-full object-cover rounded-md" 
                          alt="preview"
                        />
                        <button
                          type="button"
                          onClick={() => removeNewImage(index)}
                          disabled={isInventory}
                          className="absolute -top-2 -right-2 bg-destructive text-white rounded-full p-0.5 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity disabled:hidden"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
                  <div className="flex items-center gap-2 pt-4">
              <Switch 
                id="isPopular" 
                checked={formData.IsPopular} 
                onCheckedChange={(val) => setFormData({...formData, IsPopular: val})} 
              />
              <Label htmlFor="isPopular" className="cursor-pointer font-semibold">
                {t("isPopular")}
              </Label>
            </div>

            </div>
          </CardContent>
        </Card>
      </div>

      <div className="col-span-12 flex justify-center mt-6">
        <Button onClick={handleUpdate} disabled={updateLoading} className="w-full max-w-[200px] gap-2">
          {updateLoading ? <Loader2 className="animate-spin h-4 w-4" /> : <Upload className="h-4 w-4" />}
          {t("updateProduct")}
        </Button>
      </div>
    </div>
  );
};

export default EditProduct;