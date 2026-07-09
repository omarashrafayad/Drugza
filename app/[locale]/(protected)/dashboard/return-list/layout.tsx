import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Returns',
  description: 'Returns Page'
}
const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      {children}
    </>
  );
};

export default Layout;