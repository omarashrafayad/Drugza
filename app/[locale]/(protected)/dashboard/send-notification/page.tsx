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
import useGetAllRoles from "@/services/roles/getAllRoles";
import useGettingAllUsersInRegion from "@/services/area/gettingAllusersInRegion";
import GetUsers from "@/services/users/GetAllUsers";

const SendNotificationPage = () => {
  const t = useTranslations("NotificationsList");
  const [recipientType, setRecipientType] = useState<string>("All");
  const [selectedUserIds, setSelectedUserIds] = useState<string[]>([]);
  const [title, setTitle] = useState<string>("");
  const [roleId, setRoleId] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [expiryDate, setExpiryDate] = useState<Date | undefined>(new Date());

  const{data: users, loading: usersLoading, gettingAllUsers} = GetUsers()
  const { sendNotification, loading: sending } = useSendNotification();
  const { data, loading: rolesLoading, getAllRoles } = useGetAllRoles();

  useEffect(() => {
    getAllRoles();
    gettingAllUsers();
  }, []);

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

    let recipientTypeValue = RecipientType.SpecificUser;
    if (recipientType === "all") recipientTypeValue = RecipientType.All;
    else if (recipientType === "role") recipientTypeValue = RecipientType.Role;
    else if (recipientType === "specific_User") recipientTypeValue = RecipientType.SpecificUser;

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
      setRecipientType("All");
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
                <SelectValue placeholder="Select Recipient Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All</SelectItem>
                <SelectItem value="role">Role</SelectItem>
                <SelectItem value="specific_User">SpecificUser</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {recipientType.startsWith("specific") && (
            <div className="space-y-2">
              <Label>Search for users</Label>
              <ReactSelect
                isMulti
                options={users?.map((user: UserType) => ({
                  value: user.id,
                  label: `${user.fullName}`
                })) || []}
                onChange={(selected: MultiValue<{ value: string, label: string }>) => {
                  setSelectedUserIds(selected.map(item => item.value));
                }}
                placeholder="Search for users"
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
      ${isSelected
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
{recipientType === "role" && (
  <>
            <Label>Roles</Label>
            <Select value={roleId} onValueChange={(value) => setRoleId(value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select Role" />
              </SelectTrigger>
              <SelectContent>
                {data?.map((role: any) => (
                  <SelectItem key={role.id} value={role.id}>
                    {role.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
  </>
)}

          <div className="space-y-2">
            <Label htmlFor="title">{t("Title")}</Label>
            <Input
              id="title"
              placeholder={t("Enter_notification_title")}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>


          <div className="space-y-2">
            <Label htmlFor="message">{t("Message")}</Label>
            <Textarea
              id="message"
              placeholder={t("Enter_your_message_here")}
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
