"use client";

import { useState, useTransition } from "react";
import { updateJson } from "@/actions/updateJson";
import Image from 'next/image';


export default function UpdateButton(newJsonData: any) {
    const [message, setMessage] = useState("");
    const [isPending, startTransition] = useTransition();

    const handleUpdate = () => {
        setMessage("");

        

        startTransition(async () => {
            const result = await updateJson(newJsonData);

            if (result.success) {
                setMessage(`Success! Commit: ${result.commitUrl}`);
            } else {
                setMessage(`Error: ${result.error}`);
            }
        });
    };

    return (
        <div>
            <button onClick={handleUpdate} disabled={isPending}       className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
            >
                <Image
                        className="dark:invert"
                        src="/vercel.svg"
                        alt="Vercel logomark"
                        width={20}
                        height={20}
                      />
                {isPending ? "Updating..." : "Push to GitHub & deploy on Vercel"}
            </button>
            <br />
            {message && <p>{message}</p>}
        </div>
    );
}
