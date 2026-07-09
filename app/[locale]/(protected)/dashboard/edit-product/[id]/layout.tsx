import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Edit Product',
  description: 'Edit Product Page'
}
const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      {children}
    </>
  );
};

export default Layout;