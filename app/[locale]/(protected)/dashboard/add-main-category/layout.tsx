import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Add Main Category",
  description: "Add Main Category Page",
};

const Layout = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

export default Layout;
