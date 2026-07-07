"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Controller, useForm, SubmitHandler, useFieldArray } from "react-hook-form";
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from "@/components/ui/select";
import useRegister from "@/services/auth/register";
import { toast } from "sonner";
import Cookies from "js-cookie";
import { Plus, Trash2 } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import ReactSelect, { MultiValue } from "react-select";
import useGetCountries from "@/services/countries/getAllCountries";
import useGetCities from "@/services/cities/getAllCities";
import useGetAreas from "@/services/areas/getAllAreas";
import useGetZones from "@/services/zones/getAllZones";
import useGetAreaZones from "@/services/areaZones/getAllAreaZones";
import { Switch } from "@/components/ui/switch";
import useGetAllRoles from "@/services/roles/getAllRoles";
import { useTranslations } from "next-intl";

type Inputs = {
    FirstName: string;
    LastName: string;
    Email: string;
    Password: string;
    ConfirmPassword: string;
    PhoneNumber: string;
    RoleId: string;
    AddressLines: { value: string }[];
    IsActive: boolean;
    IsPopular?: boolean;
    Area?: string;
    SubArea?: string;
    Country?: string;
    Zone?: any;
    Salary?: string;
};

const RegForm = () => {
    const { registerUser } = useRegister();
    const userRole = Cookies.get("userRole");
    const t = useTranslations("auth");
    const [profileImage, setProfileImage] = useState<File | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setProfileImage(e.target.files[0]);
        }
    };

    const { countries, getAllCountries } = useGetCountries();
    const { cities, getAllCities } = useGetCities();
    const { areas, getAllAreas } = useGetAreas();
    const { zones, getAllZones } = useGetZones();
    const { areaZones, getAllAreaZones } = useGetAreaZones();
    const { data: roles, getAllRoles } = useGetAllRoles();

    const {
        register,
        handleSubmit,
        control,
        reset,
        watch,
        setValue,
        formState: { errors }
    } = useForm<Inputs>({
        defaultValues: {
            RoleId: "",
            Area: "",
            SubArea: "",
            Country: "",
            Zone: "",
            Salary: "",
        },
    });

    const selectedRoleId = watch("RoleId");

    // Find role names dynamically to determine if it's a provider or deliverer
    const selectedRoleName = roles?.find(r => r.id.toLowerCase() === selectedRoleId?.toLowerCase())?.name;
    const isProvider = selectedRoleName === "Inventory";
    const isDeliver = selectedRoleName === "representative";

    const selectedCountryId = watch("Country");
    const selectedCityId = watch("SubArea");
    const selectedAreaId = watch("Area");

    const filteredCities = selectedCountryId
        ? cities?.filter((city: any) => city.countryName === countries?.find((c: any) => c.id.toString() === selectedCountryId)?.name) || []
        : [];

    const filteredAreas = selectedCityId
        ? areas?.filter((area: any) => area.cityName === cities?.find((c: any) => c.id.toString() === selectedCityId)?.name) || []
        : [];

    const filteredZones = selectedAreaId && areaZones
        ? zones?.filter((zone: any) => {
            const targetAreaName = areas?.find((a: any) => a.id.toString() === selectedAreaId)?.name;
            return areaZones.some((az: any) => az.areaName === targetAreaName && az.zoneName === zone.name);
        }) || []
        : [];

    useEffect(() => {
            getAllRoles();
            getAllCountries();
            getAllCities();
            getAllAreas();
            getAllZones();
            getAllAreaZones();
        
    },[]);

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        try {
            const formData = new FormData();

            formData.append("FirstName", data.FirstName);
            formData.append("LastName", data.LastName);
            formData.append("Password", data.Password);
            formData.append("ConfirmPassword", data.ConfirmPassword);
            formData.append("PhoneNumber", data.PhoneNumber);
            formData.append("RoleId", data.RoleId);
            if (data.Area) formData.append("AreaId", data.Area);
            if (data.SubArea) formData.append("CityId", data.SubArea);
            if (data.Country) formData.append("CountryId", data.Country);
            if (data.Zone) formData.append("ZoneId", data.Zone);
            if (profileImage) formData.append("ProfileImage", profileImage);
            const result = await registerUser(formData);

            if (result) {
                toast.success("Registration successful!");
                reset();
                setProfileImage(null);
            }
        } catch (error) {
            toast.error("Registration failed.");
            console.error(error);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
                <Label htmlFor="FirstName">{t("FirstName")}</Label>
                <Input id="FirstName" {...register("FirstName", { required: "Required" })} />
            </div>
            <div className="space-y-2">
                <Label htmlFor="LastName">{t("LastName")}</Label>
                <Input id="LastName" {...register("LastName", { required: "Required" })} />
            </div>

            <div className="space-y-2">
                <Label htmlFor="phone">{t("phone")}</Label>
                <Input id="phone" {...register("PhoneNumber", { required: "Required" })} />
            </div>
            <div className="space-y-2">
                <Label htmlFor="password">{t("password")}</Label>
                <Input id="password" type="password" {...register("Password", { required: "Required" })} />
            </div>
            <div className="space-y-2">
                <Label htmlFor="confirmPassword">{t("confirm_password")}</Label>
                <Input id="confirmPassword" type="password" {...register("ConfirmPassword", { required: "Required" })} />
            </div>
            <div className="space-y-2">
                <Label htmlFor="userType">User Type</Label>
                <Controller
                    name="RoleId"
                    control={control}
                    rules={{ required: "Please select a role" }}
                    render={({ field }) => (
                        <Select onValueChange={field.onChange} value={field.value}>
                            <SelectTrigger><SelectValue placeholder="Select a role" /></SelectTrigger>
                            <SelectContent>
                                {roles?.map((role) => (
                                    <SelectItem key={role.id} value={role.id}>
                                        {role.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    )}
                />
            </div>
                <>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="country">{t("country")}</Label>
                            <Controller
                                name="Country"
                                control={control}
                                rules={{ required: "Required" }}
                                render={({ field }) => (
                                    <Select onValueChange={(val) => {
                                        field.onChange(val);
                                        setValue("SubArea", "");
                                        setValue("Area", "");
                                        setValue("Zone", "");
                                    }} value={field.value}>
                                        <SelectTrigger><SelectValue placeholder="Select Country" /></SelectTrigger>
                                        <SelectContent>
                                            {countries?.map((item: any) => (
                                                <SelectItem key={item.id} value={item.id.toString()}>{item.name}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                )}
                            />
                            {errors.Country && <span className="text-sm text-red-500">{errors.Country.message}</span>}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="subArea">{t("city")}</Label>
                            <Controller
                                name="SubArea"
                                control={control}
                                rules={{ required: "Required" }}
                                render={({ field }) => (
                                    <Select onValueChange={(val) => {
                                        field.onChange(val);
                                        setValue("Area", "");
                                        setValue("Zone", "");
                                    }} value={field.value}>
                                        <SelectTrigger><SelectValue placeholder="Select City" /></SelectTrigger>
                                        <SelectContent>
                                            {filteredCities.map((item: any) => (
                                                <SelectItem key={item.id} value={item.id.toString()}>{item.name}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                )}
                            />
                            {errors.SubArea && <span className="text-sm text-red-500">{errors.SubArea.message}</span>}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="area">{t("area")}</Label>
                            <Controller
                                name="Area"
                                control={control}
                                rules={{ required: "Required" }}
                                render={({ field }) => (
                                    <Select onValueChange={(val) => {
                                        field.onChange(val);
                                        setValue("Zone", "");
                                    }} value={field.value}>
                                        <SelectTrigger><SelectValue placeholder="Select Area" /></SelectTrigger>
                                        <SelectContent>
                                            {filteredAreas.map((item: any) => (
                                                <SelectItem key={item.id} value={item.id.toString()}>{item.name}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                )}
                            />
                            {errors.Area && <span className="text-sm text-red-500">{errors.Area.message}</span>}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="zone">{t("zone")}</Label>
                            <Controller
                                name="Zone"
                                control={control}
                                rules={{ required: "Required" }}
                                render={({ field }) => (
                                    isDeliver ? (
                                        <ReactSelect
                                            isMulti
                                            options={filteredZones.map((z: any) => ({ value: z.id.toString(), label: z.name }))}
                                            className="react-select"
                                            classNamePrefix="select"
                                            onChange={field.onChange}
                                            value={field.value}
                                            placeholder="Select Zones"
                                            styles={{
                                                control: (base) => ({
                                                    ...base,
                                                    minHeight: '40px',
                                                    fontSize: '0.875rem',
                                                    backgroundColor: 'transparent',
                                                    borderColor: 'hsl(var(--input))',
                                                }),
                                                placeholder: (base) => ({
                                                    ...base,
                                                    fontSize: '0.875rem',
                                                    color: 'hsl(var(--muted-foreground))',
                                                }),
                                                multiValue: (base) => ({
                                                    ...base,
                                                    backgroundColor: 'hsl(var(--secondary))',
                                                    borderRadius: '4px',
                                                }),
                                                multiValueLabel: (base) => ({
                                                    ...base,
                                                    color: 'hsl(var(--secondary-foreground))',
                                                }),
                                                menu: (base) => ({
                                                    ...base,
                                                    backgroundColor: 'hsl(var(--popover))',
                                                    border: '1px solid hsl(var(--border))',
                                                }),
                                                option: (base, state) => ({
                                                    ...base,
                                                    backgroundColor: state.isFocused ? 'hsl(var(--accent))' : 'transparent',
                                                    color: state.isFocused ? 'hsl(var(--accent-foreground))' : 'inherit',
                                                    fontSize: '0.875rem',
                                                }),
                                            }}
                                        />
                                    ) : (
                                        <Select onValueChange={field.onChange} value={field.value}>
                                            <SelectTrigger><SelectValue placeholder="Select Zone" /></SelectTrigger>
                                            <SelectContent>
                                                {filteredZones.map((item: any) => (
                                                    <SelectItem key={item.id} value={item.id.toString()}>{item.name}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    )
                                )}
                            />
                            {errors.Zone?.message && <span className="text-sm text-red-500">{String(errors.Zone.message)}</span>}
                        </div>
                    </div>

                    <div className="space-y-2 mt-4">
                        <Label htmlFor="profileImage">{t("profile_image")}</Label>
                        <div className="flex items-center gap-3">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => fileInputRef.current?.click()}
                                className="flex gap-2 items-center"
                            >
                                <Plus className="w-4 h-4" />
                                {t("choose_file")}
                            </Button>

                            <span className="text-sm text-muted-foreground truncate">
                                {profileImage ? profileImage.name : "No file chosen"}
                            </span>

                            <input
                                ref={fileInputRef}
                                id="profileImage"
                                type="file"
                                accept="image/*"
                                onChange={handleFileChange}
                                className="hidden"
                            />
                        </div>
                    </div>
                </>
            {/* )} */}

            <Button type="submit" className="w-full">{t("create_account")}</Button>
        </form>
    );
};

export default RegForm;