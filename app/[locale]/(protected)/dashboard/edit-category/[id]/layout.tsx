import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Edit Category',
  description: 'Edit Category Page'
}
const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      {children}
    </>
  );
};

export default Layout;