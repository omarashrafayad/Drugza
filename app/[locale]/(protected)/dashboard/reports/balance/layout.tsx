import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Order Reports',
    description: 'Order Reports Page'
}
const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            {children}
        </>
    );
};

export default Layout;