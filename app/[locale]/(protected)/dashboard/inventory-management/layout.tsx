import { Metadata } from "next";

export const metadata: Metadata = {
  title: ' Management',
  description: ' Management Page'
}
const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      {children}
    </>
  );
};

export default Layout;