import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Order Details',
  description: 'Order Details Page'
}
const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      {children}
    </>
  );
};

export default Layout;