"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { useRouter } from "@/i18n/routing";
import { useParams } from "next/navigation";
import useGetCategoryById from "@/services/categories/getCategoryById";
import Loader from "@/components/loader";
import {Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue} from "@/components/ui/select";
import {UserRole, UserRoleLabel} from "@/enum";
import useGettingUserById from "@/services/users/gettingUserById";
import useDeactivateUser from "@/services/users/DeactivateUsers";
import {Loader2} from "lucide-react";
import useGettingPricesByInventoryId from "@/services/productPrice/gettingPricesByInventoryId";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import useUpdateUser from "@/services/users/updateUser";
import useGettingAllMainAreas from "@/services/area/gettingAllMainAreas";
import gettingAllMainAreas from "@/services/area/gettingAllMainAreas";

const InventoryPrices = () => {
  const params = useParams();
  const id = params?.id;

  const {gettingPricesByInventoryId, prices, loading: pricesLoading} = useGettingPricesByInventoryId()

  const {loading: regionsLoading, error: regionsError, getAllMainAreas, mainAreas} = useGettingAllMainAreas()

  const {error, loading, user, getUserById} = useGettingUserById()

  const { deactivateUser, loading: deactivateUserLoading, error: deactivateUserError } = useDeactivateUser()

  const {loading: updateUserLoading, updateUser} = useUpdateUser()

  const router = useRouter();

  const [activate, setActivate] = useState(false);
  const [userRole, setUserRole] = useState<UserRole | undefined>(undefined);
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [minOrder, setMinOrder] = useState(0);
  const [region, setRegion] = useState("");

  const activateUserToggle = async () => {

    try {
      const {success, error} =  await deactivateUser(id);
      if (success) {
        toast.success("User Updated", { description: "User updated successfully." });
        setTimeout(() => {
          router.push("/dashboard/inventory-managers");
        }, 1000)
      } else if (error) {
        throw new Error(error)
      }
    } catch (err) {
      toast.error("Update Failed", {
        description: err instanceof Error ? err.message : "Something went wrong.",
      });
    }
  };

  const handleUpdate = async () => {
    const formData = new FormData();
    formData.append("UserName", userName);
    formData.append("Email", email);
    formData.append("PhoneNumber", phoneNumber);
    formData.append("BussinesName", businessName);
    formData.append("MinOrder", minOrder.toString());
    formData.append("RegionId", region);
    formData.append("RegionName", mainAreas?.find((area) => area.id === region)?.regionName || "");
    formData.append("IsActive", activate.toString());
    formData.append("PharmacyDetails", 'null');
    formData.append("DesName", 'null');

    try {
      const {success, error} =  await updateUser(formData, id);
      if (success) {
        toast.success("User Updated", { description: "User updated successfully." });
      } else if (error) {
        throw new Error(error)
      }
    } catch (err) {
      toast.error("Update Failed", {
        description: err instanceof Error ? err.message : "Something went wrong.",
      });
    }
  };

  useEffect(() => {
    if (user && mainAreas) {
      setUserRole(user?.roleId as UserRole);
      setActivate(user?.isActive);
      setUserName(user?.userName);
      setEmail(user?.email);
      setPhoneNumber(user?.phoneNumber);
      setBusinessName(user?.businessName);
      setMinOrder(user?.minOrder);
      setRegion(user?.regionId || "");
    }
  }, [user, mainAreas]);

  useEffect(() => {
    getUserById(id);
    gettingPricesByInventoryId(id);
    getAllMainAreas()
  }, []);


  return (
      <div className="gap-4 rounded-lg">
        {loading || regionsLoading ? (
            <div className="flex mx-auto justify-center items-center">
              <Loader2 className="animate-spin" />
            </div>
        ) : (
          <>
            <div className="col-span-12 space-y-6">
              <Card>
                <CardHeader className="border-b border-solid border-default-200 mb-6">
                  <CardTitle>User Information</CardTitle>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="flex items-center flex-wrap">
                    <Label className="w-[150px] flex-none" htmlFor="userName">Username</Label>
                    <Input
                        id="userName"
                        className="flex-1"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                    />
                  </div>

                  <div className="flex items-center flex-wrap">
                    <Label className="w-[150px] flex-none" htmlFor="email">Email</Label>
                    <Input
                        id="email"
                        className="flex-1"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>

                  <div className="flex items-center flex-wrap">
                    <Label className="w-[150px] flex-none" htmlFor="phone">Phone</Label>
                    <Input
                        id="phone"
                        className="flex-1"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                  </div>

                  <div className="flex items-center flex-wrap">
                    <Label className="w-[150px] flex-none" htmlFor="business">Business Name</Label>
                    <Input
                        id="business"
                        className="flex-1"
                        value={businessName}
                        onChange={(e) => setBusinessName(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2 flex items-center flex-wrap">
                    <Label className="w-[150px] flex-none" htmlFor="region">Region</Label>
                    <Select value={region} onValueChange={(value) => setRegion(value)}>
                      <SelectTrigger className="flex-1 cursor-pointer">
                        <SelectValue placeholder="Select region" />
                      </SelectTrigger>
                      <SelectContent>
                        {mainAreas?.map((region) => (
                            <SelectItem key={region.id} value={region.id as string
                            }>
                              {region.regionName}
                            </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center flex-wrap">
                    <Label className="w-[150px] flex-none" htmlFor="minOrder">Min Order</Label>
                    <Input
                        id="minOrder"
                        type="number"
                        className="flex-1"
                        value={minOrder}
                        onChange={(e) => setMinOrder(Number(e.target.value))}
                    />
                  </div>

                  <div className="col-span-12 flex justify-end mt-4">
                    <Button onClick={handleUpdate}>
                      {updateUserLoading ? (
                          <div className="flex flex-row gap-3 items-center">
                            <Loader />
                            <div className="flex justify-center items-center">
                              <Loader2 className="text-white animate-spin"/>
                            </div>
                          </div>
                      ) : (
                          "Update user"
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="border-b border-solid border-default-200 mb-6">
                  <CardTitle>Profile Activation</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center flex-wrap">
                    <Label className="w-[150px] flex-none" htmlFor="active">Active Status</Label>
                    <Select value={activate ? "true" : "false"} onValueChange={(value) => setActivate(value === "true")}>
                      <SelectTrigger className="flex-1 cursor-pointer">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="true">Active</SelectItem>
                        <SelectItem value="false">Inactive</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="col-span-12 flex justify-end mt-4">
                    <Button onClick={activateUserToggle}>
                      {deactivateUserLoading ? (
                          <div className="flex flex-row gap-3 items-center">
                            <Loader />
                            <div className="flex justify-center items-center">
                              <Loader2 className="text-white animate-spin"/>
                            </div>
                          </div>
                      ) : (
                          "Change user Activation"
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

          </>
        )}

        {pricesLoading ? (
            <div className="flex mx-auto justify-center items-center">
              <Loader2 className="animate-spin" />
            </div>
        ): (
            <div className="col-span-12 mt-6">
              <Card>
                <CardHeader className="border-b border-solid border-default-200 mb-6">
                  <CardTitle>Inventory Prices</CardTitle>
                </CardHeader>

                <CardContent className="space-y-4">
                  {prices.length > 0 ? (
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="w-[100px]">Product</TableHead>
                            <TableHead className="w-[100px]">Purchase Price</TableHead>
                            <TableHead className="w-[100px]">Sales Price</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {prices.map((price) => (
                              <TableRow key={price.id}>
                                <TableCell className="font-medium">{price.productName}</TableCell>
                                <TableCell className="font-medium">{price.purchasePrice}</TableCell>
                                <TableCell className="font-medium">{price.salesPrice}</TableCell>
                              </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                  ) : (
                      <div className="text-center text-default-600">No prices available for this inventory.</div>
                  )}
                </CardContent>
              </Card>
            </div>
        )}
      </div>
  );
};

export default InventoryPrices;