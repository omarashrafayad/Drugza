import React from 'react';
import {Button} from "@/components/ui/button";
import {Link} from "@/i18n/routing";

function Reports() {
    return (
        <>
            <h1 className="text-2xl font-bold mb-4">Reports</h1>
            <hr className={"bg-blue-100 w-full"}/>
            <div className="grid grid-cols-3 gap-4 p-4">
                <Link
                    href={"/dashboard/reports/orders"}
                    className="w-full"
                >
                    <Button
                        size={"lg"}
                        variant={"outline"}
                        className="w-full"
                    >
                        Orders
                    </Button>
                </Link>
                <Link
                    href={"/dashboard/reports/invoices"}
                    className="w-full"
                >
                    <Button size={"lg"} variant={"outline"} className="w-full">
                        Invoices
                    </Button>
                </Link>
                <Link
                    href={"/dashboard/reports/balance"}
                    className="w-full"
                >
                    <Button size={"lg"} variant={"outline"} className="w-full">
                        Balance
                    </Button>
                </Link>
                <Link
                    href={"/dashboard/reports/summary"}
                    className="w-full"
                >
                    <Button size={"lg"} variant={"outline"} className="w-full">
                        Summary
                    </Button>
                </Link>
            </div>
        </>
    );
}

export default Reports;