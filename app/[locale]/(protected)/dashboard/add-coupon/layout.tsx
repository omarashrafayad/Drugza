import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Add Coupon',
  description: 'Add Coupon Page'
}
const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      {children}
    </>
  );
};

export default Layout;