import React from 'react';
import TransactionsTable from "@/app/[locale]/(protected)/dashboard/modules/transactions";
import {Card} from "@/components/ui/card";


function Modules() {
    return (
        <>
            <Card>
                <TransactionsTable />
            </Card>
        </>
    );
}

export default Modules;