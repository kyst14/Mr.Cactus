import { Footer } from '@/components/Footer/Footer'
import Menu from "@/components/Menu/Menu";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
    return (
        <div>
            <Menu />
            {children}
            <Footer />
        </div>
    )
}