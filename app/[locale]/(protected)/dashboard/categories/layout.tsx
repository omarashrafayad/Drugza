import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Categories',
  description: 'Categories List Page'
}
const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      {children}
    </>
  );
};

export default Layout;