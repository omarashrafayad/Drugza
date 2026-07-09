'use client'

import {Card} from "@/components/ui/card";
import TransactionsTable from "./transactions";

function InvoicesReports() {
    return (
        <>
            <div>
                <Card>
                    <TransactionsTable />
                </Card>
            </div>
        </>
    )
}

export default InvoicesReports;