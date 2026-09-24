import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Edit Main Category",
  description: "Edit Main Category Page",
};

const Layout = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

export default Layout;
