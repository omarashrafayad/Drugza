'use client'

import {Card} from "@/components/ui/card";
import TransactionsTable from "./transactions";

function OrderReport() {
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

export default OrderReport;