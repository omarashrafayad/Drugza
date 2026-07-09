import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Orders',
  description: 'Orders Page'
}
const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      {children}
    </>
  );
};

export default Layout;