import Link from 'next/link'

export const FooterLink = ({ children, href }: { children: React.ReactNode, href: string }) => {
	return (
		<li>
			<Link href={href} className="relative text-text text-xl font-bold font-sans before:absolute before:bg-text/80 before:rounded-b-md before:bottom-0 before:left-0 before:h-0.5 before:w-full before:origin-bottom before:scale-x-[0.1] hover:before:bg-text hover:before:scale-x-100 before:transition-transform before:ease-in-out before:duration-300 ">{children}
			</Link>
		</li>
	)
}