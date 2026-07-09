import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Customer List',
  description: 'Customer List Page'
}
const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      {children}
    </>
  );
};

export default Layout;