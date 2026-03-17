import { Footer } from '@/components/Footer'
import Menu from "@/components/Menu";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
    return (
        <div>
            <Menu />
            {children}
            <Footer />
        </div>
    )
}