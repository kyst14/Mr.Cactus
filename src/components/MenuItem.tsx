import Link from 'next/link'

export const MenuItem = ({ children, href, hover = true }: { children: React.ReactNode, href: string, hover?: boolean }) => {
	return (
		<li className={`cursor-pointer relative hover:text-primary before:absolute before:bg-primary/20 before:rounded-b-md before:bottom-0 before:left-0 before:h-full before:w-full before:origin-bottom before:scale-y-[0.35] hover:before:rounded-lg hover:before:scale-y-100 before:transition-transform-[border-radius] before:ease-in-out before:duration-300 before:px-2 ${hover ? "px-2" : "before:hidden"}`}>
		<Link href={href} className='text-1xl tracking-wide uppercase font-bold font-sans relative'>
			{children}
		</Link>
		</li>
	)
}