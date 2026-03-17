import { PAGES } from "@/config/pages.config";
import Link from "next/link";

export default function NotFound() {
    return (
        <div className="flex flex-col min-h-screen items-center justify-center gap-4 bg-bg">
            
            <div className="flex items-center justify-center gap-2 text-text text-5xl font-bold">
                <h1 className="border-r-2 border-text pr-2">404</h1>

                <p>Not Found</p>
            </div>

            <p className="text-text text-2xl font-light">Please try again later.</p>

            <Link href={PAGES.HOME} className="text-primary text-1xl font-light hover:underline">Повернутися до головної</Link>
        </div>
    );
}