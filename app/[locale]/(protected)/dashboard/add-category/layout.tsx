import { Metadata } from "next";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as SonnerToaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  title: 'Add Category',
  description: 'Add Category Page'
}
const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      {children}
      <Toaster/>
      <SonnerToaster/>
    </>
  );
};

export default Layout;