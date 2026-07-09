import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Registration",
  description: "Registration page for creating new accounts with user types",
};
const Layout = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

export default Layout;
