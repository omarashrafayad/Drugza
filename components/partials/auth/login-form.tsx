"use client";
import React from 'react'
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from '@/i18n/routing';
import { Icon } from "@/components/ui/icon";
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from "zod";
import { cn } from "@/lib/utils"
import { Loader2 } from 'lucide-react';
import { toast } from "sonner"
import { useRouter } from '@/components/navigation';
import {loginWithCredentials} from "@/services/auth/login";
import {defaultRouteByRole, normalizeRole} from "@/lib/roleRoutes";
import {AuthType} from "@/types/auth";
import Cookies from "js-cookie";

const schema = z.object({
  phoneNumber: z.string().min(11, "رقم الجوال يجب أن يكون 11 رقم"),
  password: z.string().min(6, "كلمة المرور يجب أن تكون 6 أرقام على الأقل"),
});
const LoginForm = () => {
  const [isPending, startTransition] = React.useTransition();
  const router = useRouter();
  const [passwordType, setPasswordType] = React.useState("password");


  const togglePasswordType = () => {
    if (passwordType === "text") {
      setPasswordType("password");
    } else if (passwordType === "password") {
      setPasswordType("text");
    }
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    mode: "all",
    defaultValues: {
      phoneNumber: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof schema>) => {
    startTransition(async () => {
      try {
        const user: AuthType = await loginWithCredentials(data);

        const rawRole = user?.role || Cookies.get("userRole");
        const role = normalizeRole(rawRole);
        const route = defaultRouteByRole[role || ""] || "/dashboard/analytics";

        router.push(route);
        toast.success("Successfully logged in");
      } catch (err: any) {
        toast.error(err.message || "Login failed");
      }
    });
  };


  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-5 2xl:mt-7 space-y-4">
      <div className="space-y-2">
        <Label htmlFor="phoneNumber" className=" font-medium text-default-600">
          رقم الجوال{" "}
        </Label>
        <Input size="lg"
          disabled={isPending}
          {...register("phoneNumber")}
          type="text"
          id="phoneNumber"
          className={cn("", {
            "border-destructive ": errors.phoneNumber,
          })}
        />
      </div>
      {errors.phoneNumber && (
        <div className=" text-destructive mt-2 text-sm">
          {errors.phoneNumber.message}
        </div>
      )}

      <div className="mt-3.5 space-y-2">
        <Label htmlFor="password" className="mb-2 font-medium text-default-600">
          كلمة المرور{" "}
        </Label>
        <div className="relative">
          <Input size="lg"
            disabled={isPending}
            {...register("password")}
            type={passwordType}
            id="password"
            className="peer  "
            placeholder=" "
          />

          <div
            className="absolute top-1/2 -translate-y-1/2 ltr:right-4 rtl:left-4 cursor-pointer"
            onClick={togglePasswordType}
          >
            {passwordType === "password" ? (
              <Icon icon="heroicons:eye" className="w-5 h-5 text-default-400" />
            ) : (
              <Icon
                icon="heroicons:eye-slash"
                className="w-5 h-5 text-default-400"
              />
            )}
          </div>
        </div>
      </div>
      {errors.password && (
        <div className=" text-destructive mt-2 text-sm">
          {errors.password.message}
        </div>
      )}

      <div className="flex justify-between">
        <Link
          href="/auth/forgot-password"
          className="text-sm text-default-800 dark:text-default-400 leading-6 font-medium"
        >
          هل نسيت كلمة السر ؟
        </Link>
      </div>
      <Button fullWidth disabled={isPending}>
        {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {isPending ? "جاري تسجيل الدخول..." : "تسجيل الدخول"}
      </Button>
    </form>
  );
};
export default LoginForm;
