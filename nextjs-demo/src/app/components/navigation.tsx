"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const Navigation = () => {
    const pathname = usePathname();

    return (
        <nav>
            <Link href="/" className={pathname === "/" 
                ? "mr-4 p-2 text-[var(--foreground)] hover:underline bg-[var(--primary-highlight)] rounded" 
                : "mr-4 p-2 text-[var(--foreground)] hover:underline"
            }>
                Home
            </Link>
            <Link href="/exercises" className={pathname === "/exercises" 
                ? "mr-4 p-2 text-[var(--foreground)] hover:underline bg-[var(--primary-highlight)] rounded" 
                : "mr-4 p-2 text-[var(--foreground)] hover:underline"
            }>
                Exercises
            </Link>
            <Link href="/exercises/add" className={pathname === "/exercises/add"
                ? "mr-4 p-2 text-[var(--foreground)] hover:underline bg-[var(--primary-highlight)] rounded" 
                : "mr-4 p-2 text-[var(--foreground)] hover:underline"
            }>
                Add Exercise
            </Link>
        </nav>
    )
}