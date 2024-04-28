"use client";

import HowAmIDoingVisual from "@/components/HowAmIDoingVisual/HowAmIDoingVisual";
import { use, useEffect, useState } from "react";

export default function HomePage(): JSX.Element {

    useEffect(() => {
    }, []);

    return (
        <div className="p-8">
            <header className="mb-8">
                <h1 className="text-4xl">Welcome</h1>
                <h2 className="text-2xl">Let&rsquo;s start getting you better!</h2>
            </header>
            <main>
                <HowAmIDoingVisual />
            </main>
        </div>
    );
}
