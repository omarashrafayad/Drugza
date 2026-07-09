import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Area',
  description: 'Area Page'
}
const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      {children}
    </>
  );
};

export default Layout;