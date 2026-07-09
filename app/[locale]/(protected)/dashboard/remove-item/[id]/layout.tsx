import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Order Management',
  description: 'Order Management Page'
}
const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      {children}
    </>
  );
};

export default Layout;