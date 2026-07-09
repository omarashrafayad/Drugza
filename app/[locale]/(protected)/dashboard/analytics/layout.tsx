import { Metadata } from "next";

export const metadata:Metadata={
  title: 'Dashboard',
  description: 'Dashboard'
}
const Layout = ({children}: {children: React.ReactNode}) => {
  return (
    <>
      {children}
    </>
  );
};

export default Layout;