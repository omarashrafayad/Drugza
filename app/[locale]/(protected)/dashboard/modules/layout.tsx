import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Modules',
  description: 'Modules List Page'
}
const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      {children}
    </>
  );
};

export default Layout;