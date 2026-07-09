import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Add Product',
  description: 'Add Product Page'
}
const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      {children}
    </>
  );
};

export default Layout;