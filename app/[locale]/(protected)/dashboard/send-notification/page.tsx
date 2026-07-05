"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Check, ChevronsUpDown, Loader2, Send } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import useGetUsersByRoleId from "@/services/users/GetUsersByRoleId";
import useSendNotification, { RecipientType } from "@/services/notifications/sendNotification";
import { toast } from "sonner";
import { UserType } from "@/types/users";
import ReactSelect, { MultiValue } from "react-select";
import { useTranslations } from "next-intl";

const SendNotificationPage = () => {
  const t = useTranslations("NotificationsList");
  const [recipientType, setRecipientType] = useState<string>("all_doctors");
  const [selectedUserIds, setSelectedUserIds] = useState<string[]>([]);
  const [title, setTitle] = useState<string>("");
  const [roleId, setRoleId] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [expiryDate, setExpiryDate] = useState<Date | undefined>(new Date());

  const { users, loading: usersLoading, getUsersByRoleId } = useGetUsersByRoleId();
  const { sendNotification, loading: sending } = useSendNotification();

  useEffect(() => {
    if (recipientType === "specific_doctor") {
      getUsersByRoleId("E48E5A9F-2074-4DE9-A849-5C69FDD45E4E"); // Doctor Role ID
    } else if (recipientType === "specific_provider") {
      getUsersByRoleId("1A5A84FB-23C3-4F9B-A122-4C5BC6C5CB2D"); // Provider Role ID
    }
  }, [recipientType]);

  const handleSend = async () => {
    if (!title) {
      toast.error("Please enter a title");
      return;
    }

    if (!message) {
      toast.error("Please enter a message");
      return;
    }



    if (!expiryDate) {
      toast.error("Please select an expiry date");
      return;
    }

    if (!roleId) {
      toast.error("Please select a role");
      return;
    }

    let recipientTypeValue = RecipientType.Specific;
    if (recipientType === "all_doctors") recipientTypeValue = RecipientType.AllDoctors;
    else if (recipientType === "all_providers") recipientTypeValue = RecipientType.AllProviders;
    
    const payload = {
      recipientType: recipientTypeValue,
      userIds: recipientType.startsWith("specific") ? selectedUserIds : [],
      title,
      roleId,
      message,
      expired: expiryDate.toISOString(),
    };

    const { success, error } = await sendNotification(payload);

    if (success) {
      toast.success("Notification sent successfully!");
      setTitle("");
      setMessage("");
      setSelectedUserIds([]);
      setRoleId("");
      setExpiryDate(new Date());
      setRecipientType("all_doctors");
    } else {
      toast.error(error || "Failed to send notification");
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">{t("SendNotification")}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label>{t("RecipientType")}</Label>
            <Select value={recipientType} onValueChange={(val) => {
              setRecipientType(val);
              setSelectedUserIds([]);
            }}>
              <SelectTrigger>
                <SelectValue placeholder={t("Select_Who_To_Send_To")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all_doctors">{t("AllDoctors")}</SelectItem>
                <SelectItem value="all_providers">{t("AllProviders")}</SelectItem>
                <SelectItem value="specific_doctor">{t("SpecificDoctor")}</SelectItem>
                <SelectItem value="specific_provider">{t("SpecificProvider")}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {recipientType.startsWith("specific") && (
            <div className="space-y-2">
              <Label>{t("Select")}{t(recipientType.includes("doctor") ? "Doctor" : "Provider")}</Label>
              <ReactSelect
                  isMulti
                options={users?.map((user: UserType) => ({
                  value: user.id,
                  label: `${user.userName} (${user.email})`
                })) || []}
                onChange={(selected: MultiValue<{value: string, label: string}>) => {
                  setSelectedUserIds(selected.map(item => item.value));
                }}
                placeholder={`${t("Search")}${t(recipientType.includes("doctor") ? "Doctor" : "Provider")}...`}
                classNamePrefix="react-select"
                classNames={{
    control: () =>
      `
      !bg-white dark:!bg-gray-900
      !border !border-gray-300 dark:!border-gray-700
      !shadow-none
      hover:!border-blue-500
      `,

    menu: () =>
      `
      !bg-white dark:!bg-gray-900
      !border !border-gray-300 dark:!border-gray-700
      `,

    option: ({ isFocused, isSelected }) =>
      `
      ${
        isSelected
          ? "!bg-blue-600 !text-white"
          : isFocused
          ? "!bg-gray-100 dark:!bg-gray-800"
          : "!bg-white dark:!bg-gray-900"
      }
      !text-black dark:!text-white
      `,

    multiValue: () =>
      `!bg-gray-200 dark:!bg-gray-800`,

    multiValueLabel: () =>
      `!text-black dark:!text-white `,

    multiValueRemove: () =>
      `!text-black dark:!text-white hover:!bg-red-600 hover:!text-white`,

    placeholder: () =>
      `!text-gray-500 dark:!text-gray-400`,

    input: () =>
      `!text-black dark:!text-white `,

    singleValue: () =>
      ` !text-black dark:!text-white `,
  }}
              />
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="title">{t("Title")}</Label>
            <Input
              id="title"
              placeholder={t("Enter_notification_title...")}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">{t("Message")}</Label>
            <Label>Role</Label>
           <Input
           id="roleId"
           placeholder="Enter role ID..."
           value={roleId}
           onChange={(e) => setRoleId(e.target.value)}
           />
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">Message</Label>
            <Textarea
              id="message"
              placeholder={t("Enter_your_message_here...")}
              rows={5}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label>{t("ExpiryDate")}</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !expiryDate && "text-muted-foreground"
                  )}
                >
                  {expiryDate ? format(expiryDate, "PPP") : <>{t("Pick_a_date")}</>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={expiryDate}
                  onSelect={setExpiryDate}
                  initialFocus
                  disabled={(date) => date < new Date()}
                />
              </PopoverContent>
            </Popover>
            <p className="text-xs text-muted-foreground">{t("The_notification_will_disappear_for_the_user_after_this_date")}</p>
          </div>

          <div className="pt-4">
            <Button onClick={handleSend} className="w-full h-12 text-lg" disabled={sending}>
              {sending ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  {t("Sending...")}
                </>
              ) : (
                <>
                  <Send className="mr-2 h-5 w-5" />
                  {t("SendNotification")}
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SendNotificationPage;
