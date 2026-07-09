import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Drugza",
  description: "Drugza dashboard.",
};
const Layout = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

export default Layout;
