import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Add Product Price',
  description: 'Add Product Price Page'
}
const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      {children}
    </>
  );
};

export default Layout;