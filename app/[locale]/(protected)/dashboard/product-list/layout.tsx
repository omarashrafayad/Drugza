import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Product List',
  description: 'Product List Page'
}
const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      {children}
    </>
  );
};

export default Layout;