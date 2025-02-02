import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navigation } from "./components/navigation";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Create Next App",
    description: "Generated by create next app",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}
            >
                <header className="bg-[var(--primary)] text-[var(--foreground)] py-4 px-6">
                <div className="flex justify-between">
                    <div>
                    <h1 className="text-5xl font-bold font-sans pb-3">Exercise Tracker</h1>
                    <h3 className="text-sm font-semibold">NextJS Demo by Alejandro Grau</h3>
                    </div>
                    <div className="flex items-center">
                    <Navigation />
                    </div>
                </div>
                </header>

                <main className="flex-1">{children}</main>

                <footer className="bg-[var(--primary)] text-[var(--foreground)] py-4 px-6">
                    <a className="my-2 hover:underline" href="https://www.linkedin.com/in/alejandro-grau/" target="_blank">LinkedIn</a>
                    <br />
                    <a className="my-2 hover:underline" href="https://github.com/graua-git/nextjs-demo" target="_blank">GitHub Repository</a>
                    <h1>alejandromgrau@gmail.com</h1>
                </footer>

            </body>
        </html>
    );
}
