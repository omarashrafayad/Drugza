import React from 'react';
import BrandsTable from "@/app/[locale]/(protected)/dashboard/brand/transactions";
import { Card } from "@/components/ui/card";

function Brands() {
    return (
        <>
            <Card>
                <BrandsTable />
            </Card>
        </>
    );
}

export default Brands;