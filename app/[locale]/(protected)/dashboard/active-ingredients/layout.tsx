import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Active Ingredients",
  description: "Active Ingredients Management",
};

const Layout = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

export default Layout;
