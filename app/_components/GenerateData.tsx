"use client";

import { useEffect, useState } from "react";
import { generateRandomObject, jsonData } from "../_utils/generateRandom";
import UpdateButton from "./UpdateButton";


export default function GenerateData() {
  const [data, setData] = useState<jsonData | null>(null);

  useEffect(() => {
    setData(generateRandomObject());
  }, []);
  function gen() {
    setData(generateRandomObject());
  }


  if (!data) {
    return <div>Loading...</div>;
  }


  return (
    <>
      <div>
        <h2>New JSON Data</h2>

        <pre className="block text-sm text-gray-500 dark:text-gray-400 border border-solid border-gray-300 dark:border-gray-700 rounded-md p-2">
          <code>{JSON.stringify(data, null, 2)}</code>
        </pre>
      </div>
      <button
        className="rounded-full border border-solid border-foreground transition-colors flex items-center justify-center bg-background text-foreground gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
        rel="noopener noreferrer"
        onClick={gen}
      >
        generate random data{" "}
      </button>
      <UpdateButton data={data}/>
    </>
  );
}
