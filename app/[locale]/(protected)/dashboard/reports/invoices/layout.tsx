import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Invoices Reports',
    description: 'Invoices Reports Page'
}
const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            {children}
        </>
    );
};

export default Layout;