import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Summary Reports',
    description: 'Summary Reports Page'
}
const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            {children}
        </>
    );
};

export default Layout;