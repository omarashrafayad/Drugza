'use client'

import {Card} from "@/components/ui/card";
import TransactionsTable from "./transactions";

function SummaryReports() {
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

export default SummaryReports;