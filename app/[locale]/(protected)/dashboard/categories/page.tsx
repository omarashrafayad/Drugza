import React from 'react';
import TransactionsTable from "@/app/[locale]/(protected)/dashboard/categories/transactions";
import {Card} from "@/components/ui/card";


function Categories() {
    return (
        <>
            <Card>
                <TransactionsTable />
            </Card>
        </>
    );
}

export default Categories;