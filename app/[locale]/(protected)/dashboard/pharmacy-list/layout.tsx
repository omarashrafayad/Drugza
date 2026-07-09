import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Pharmacy List',
  description: 'Pharmacy List Page'
}
const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      {children}
    </>
  );
};

export default Layout;