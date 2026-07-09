import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Brands',
    description: 'Brands List Page'
};

const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            {children}
        </>
    );
};

export default Layout;