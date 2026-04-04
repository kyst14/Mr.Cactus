import { PAGES } from '@/config/pages.config'
import { FooterLink } from './FooterLink'
import { SocialIcon } from './SocialIcon'
// import ThemeSwitcher from '../Theme/ThemeSwitcher'

export const Footer = () => {
	return (
		<footer className="relative flex justify-center items-center text-text text-2xl font-bold p-0 sm:p-2">
			<div className="relative flex flex-col justify-center items-center gap-5 border-2 border-text w-full h-full p-5 before:absolute before:bg-primary/60 before:top-0 before:left-0 sm:before:bg-primary/40 sm:before:top-1.5 sm:before:left-1.5 before:w-full before:h-full before:-z-10 sm:hover:before:-translate-x-1.5 sm:hover:before:-translate-y-1.5 before:duration-300 hover:before:bg-primary/60">
				<h1 className="font-heading font-bold text-3xl tracking-wider">
					MR.CACTUS
				</h1>

				<div className="flex gap-5">
					{' '}
					{/* Socials */}
					<SocialIcon
						href="https://instagram.com/mr.cactus360"
						icon="instagram"
					/>
					<SocialIcon
						href="https://www.facebook.com/share/1Dnbo1Q87h/?mibextid=wwXIfr"
						icon="facebook"
					/>
					<SocialIcon
						href="viber://chat?number=+380671629405"
						icon="viber"
					/>
					<SocialIcon
						href="https://github.com/kyst14/mr.cactus"
						icon="github"
					/>
				</div>

				<div>
					{' '}
					{/* Links */}
					<ul className="flex gap-5">
						<FooterLink href={PAGES.HOME}>Головна</FooterLink>
						<FooterLink href={PAGES.CATALOG}>Каталог</FooterLink>
						<FooterLink href={PAGES.CONTACT}>Контакти</FooterLink>
					</ul>
				</div>

				{/* <div className="flex gap-5 absolute bottom-5 right-5">
					<ThemeSwitcher />
				</div> */}

				<div>
					{' '}
					{/* Copyright */}
					<p className="text-center text-sm">
						©2026 Mr.Cactus. All rights reserved.
					</p>
				</div>
			</div>
		</footer>
	)
}
