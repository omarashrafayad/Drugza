import React from 'react';
import {Card} from "@/components/ui/card";
import TransactionsTable from "./transactions";

function UserRules() {
    return (
        <div>
            <Card>
                <TransactionsTable />
            </Card>
        </div>
    );
}

export default UserRules;