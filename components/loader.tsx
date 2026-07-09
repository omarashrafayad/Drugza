
'use client'
import React from "react";
import { Loader2 } from "lucide-react";
import DashCodeLogo from "./dascode-logo";
import { useMounted } from "@/hooks/use-mounted";
const Loader = () => {
    const mounted = useMounted()
    return (
        mounted ? null : <div className=" h-screen flex items-center justify-center flex-col space-y-2">
            <div className="flex gap-2 items-center ">
                <DashCodeLogo />
            </div>
            <span className=" inline-flex gap-1  items-center">
                <Loader2 className="mr-2 h-6 w-6 animate-spin" />
                Loading...
            </span>
        </div>
    );
};

export default Loader;

