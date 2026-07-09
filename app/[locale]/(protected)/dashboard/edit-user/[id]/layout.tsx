import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Edit User',
  description: 'Edit User Page'
}
const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      {children}
    </>
  );
};

export default Layout;