import { useTranslations } from "next-intl";
import {auth} from "@/lib/auth";
import BankingClientPage from "@/app/[locale]/(protected)/dashboard/banking/BankingClientPage";

const BankingPage = async () => {
  const session = await auth();

  return <BankingClientPage session={session} />;
};

export default BankingPage;
