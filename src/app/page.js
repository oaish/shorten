"use client"

import Image from "next/image";
import {useRef} from "react";

export default function Home() {
    const txt = useRef(null)
    const lbl = useRef(null)

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        let url = txt.current.value.trim();

        if (!url) {
            alert("Please enter a URL to shorten");
            return;
        }

        if (!url.includes('http://') && !url.includes('https://')) {
            alert("Please enter a valid URL (No Protocol Found)");
            return;
        }

        if (url.includes(' ')) {
            alert("Please enter a valid URL (No Spaces Allowed)");
            return;
        }

        const res = await fetch(`/api/shorten-url`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({url}),
        });

        const data = await res.json();
        txt.current.value = "";

        lbl.current.innerHTML = `Shortened URL: <a href="${data.url}" target="_blank" class="link">${data.url}</a>`
        lbl.current.classList.remove("hidden");
    }

    return (
        <main className="flex min-h-screen flex-col items-center p-24">
            <h1 className="text-7xl font-bold text-center" style={{color: 'var(--fg)'}}>
                URL SHORTENER
            </h1>
            <p>Shorten URL with ease</p>

            <form action="" className="url-form" onSubmit={handleFormSubmit}>
                <input type="text" placeholder="Enter URL to shorten" ref={txt}/>
                <button type="submit"><Image src="/next.svg" width={50} height={50} alt=""/></button>
                <label className="hidden" ref={lbl}>Shortened URL: </label>
            </form>
        </main>
    );
}
