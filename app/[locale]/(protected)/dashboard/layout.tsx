import PageTitle from "@/components/page-title";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Drugza",
  description: "Drugza Dashboard.",
};
const Layout = ({ children }: { children: React.ReactNode }) => {
  return <>
    {children}
    </>;
};

export default Layout;