import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Providers',
  description: 'Providers Page'
}
const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      {children}
    </>
  );
};

export default Layout;