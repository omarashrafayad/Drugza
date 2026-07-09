import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Coupons List',
    description: 'Coupons List Page'
}
const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            {children}
        </>
    );
};

export default Layout;