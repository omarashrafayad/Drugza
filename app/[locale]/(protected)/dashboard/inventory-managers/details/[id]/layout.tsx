import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Providers Details',
  description: 'Providers Details Page'
}
const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      {children}
    </>
  );
};

export default Layout;