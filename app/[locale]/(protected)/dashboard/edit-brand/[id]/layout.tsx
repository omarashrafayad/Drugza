import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Edit Brand',
  description: 'Edit Brand Page'
}
const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      {children}
    </>
  );
};

export default Layout;