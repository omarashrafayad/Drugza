import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Reports',
    description: 'Reports Page'
}
const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            {children}
        </>
    );
};

export default Layout;