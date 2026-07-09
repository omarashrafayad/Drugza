import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Return Details',
  description: 'Return Details Page'
}
const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      {children}
    </>
  );
};

export default Layout;