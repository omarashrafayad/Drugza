"use client";

import React, { useEffect, useState } from "react";
import useGettingProductById from "@/services/products/gettingProductById";
import { useRouter } from "@/i18n/routing";
import { useParams } from "next/navigation";
import useCreateProductPrice from "@/services/productPrice/createProductPrice";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";

function AddProductPrice() {
  const t = useTranslations("inventoryManagement");

  const {
    loading: gettingAllProductsLoading,
    getProductById,
    product,
  } = useGettingProductById();
  const router = useRouter();

  const params = useParams();
  const productId = params?.id as string;

  const [purchasePrice, setPurchasePrice] = useState<number | string>("");
  const [salesPrice, setSalesPrice] = useState<number | string>("");
  const [stock, setStock] = useState<number>(0);
  const [maxQuantity, setMaxQuantity] = useState<number>(0);
  const [discount, setDiscount] = useState<number>(0);
  const [categoryId, setCategoryId] = useState<string>(
    product?.category?.name as string
  );

  const {
    error: productPriceError,
    loading: productPriceLoading,
    createProductPrice,
  } = useCreateProductPrice();

  const onSubmit = async () => {
    if (!purchasePrice) {
      toast.error(t("purchasePriceValidation"));
      return;
    }
    if (!salesPrice) {
      toast.error(t("salesPriceValidation"));
      return;
    }
    if (!stock) {
      toast.error(t("stockQuantityValidation"));
      return;
    }
    if (!maxQuantity) {
      toast.error(t("maxQuantityValidation"));
      return;
    }
    if (!discount) {
      toast.error(t("discountValidation"));
      return;
    }

    try {
      const success = await createProductPrice({
        categoryId,
        productId,
        purchasePrice,
        salesPrice,
        stockQuantity: stock,
        maxQuantity: maxQuantity,
      });

      if (success) {
        toast.success(t("productPriceAdded"), {
          duration: 1500,
        });

        setTimeout(() => {
          router.push("/dashboard/product-list");
        }, 1500); 
      }
    } catch (error: any) {
      toast.error(t("productPriceAddFailed"));
    }
  };

  useEffect(() => {
    getProductById(productId);
  }, [categoryId]);

  useEffect(() => {
    if (product?.category?.id) {
      setCategoryId(product?.category?.id as string);
    }
  }, [product]);

  if (gettingAllProductsLoading == true) {
    return (
      <div className="w-6 h-6 flex items-center justify-center">
        <Loader2 size={12} />
      </div>
    );
  }

  return (
    <div className=" grid grid-cols-12  gap-4  rounded-lg">
      <div className="col-span-12 space-y-4 ">
        <Card>
          <CardHeader className="border-b border-solid border-default-200 mb-6">
            <CardTitle>{t("productInformation")}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center flex-wrap">
              <Label className="w-[150px] flex-none" htmlFor="salesPrice">
                {t("salesPrice")}
              </Label>
              <Input
                id="salesPrice"
                type="number"
                placeholder={t("salesPrice")}
                value={salesPrice}
                onChange={(e) => {
                  const value = e.target.value;
                  setSalesPrice(value === "" ? "" : parseFloat(value));
                }}
              />
            </div>

            <div className="flex items-center flex-wrap">
              <Label className="w-[150px] flex-none" htmlFor="purchasePrice">
                {t("purchasePrice")}
              </Label>
              <Input
                id="purchasePrice"
                type="number"
                placeholder={t("purchasePrice")}
                value={purchasePrice}
                onChange={(e) => {
                  const value = parseFloat(e.target.value);
                  setPurchasePrice(value);
                  if (salesPrice) {
                    const sales = Number(salesPrice);
                    const calculatedDiscount = ((sales - value) / sales) * 100;
                    setDiscount(parseFloat(calculatedDiscount.toFixed(2)));
                  }
                }}
              />
            </div>

            <div className="flex items-center flex-wrap">
              <Label className="w-[150px] flex-none" htmlFor="stock">
                {t("stockQuantity")}
              </Label>
              <Input
                id="stock"
                type="number"
                placeholder="eg. 100"
                value={stock}
                onChange={(e) => setStock(parseInt(e?.target?.value))}
              />
            </div>
            <div className="flex items-center flex-wrap">
              <Label className="w-[150px] flex-none" htmlFor="stock">
                {t("maxQuantity")}
              </Label>
              <Input
                id="stock"
                type="number"
                placeholder="eg. 100"
                value={maxQuantity}
                onChange={(e) => setMaxQuantity(parseInt(e?.target?.value))}
              />
            </div>
            <div className="flex items-center">
              <Label className="w-[150px] flex-none" htmlFor="discount">
                {t("discount_")}
              </Label>
              <div className="relative w-full ">
                <Input
                  id="discount"
                  type="number"
                  placeholder="eg. 100"
                  value={discount}
                  onChange={(e) => {
                    const input = parseFloat(e.target.value);
                    const value = Math.min(input, 100);
                    setDiscount(value);

                    if (salesPrice) {
                      const sales = Number(salesPrice);
                      const calculatedPurchasePrice = sales * (1 - value / 100);
                      setPurchasePrice(
                        parseFloat(calculatedPurchasePrice.toFixed(2))
                      );
                    }
                  }}
                  className="pr-10"
                />
                <span className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-gray-500 text-sm">
                  %
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="col-span-12 flex justify-end">
        <Button
          className={`cursor-pointer ${
            productPriceLoading === true ? "cursor-not-allowed" : ""
          }`}
          onClick={() => onSubmit()}
        >
          {productPriceLoading === true ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            t("saveProductPrice")
          )}
        </Button>
      </div>
    </div>
  );
}

export default AddProductPrice;
