import { faGithub, faInstagram, faFacebook, faViber } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'

const icons = {
	github: faGithub,
	instagram: faInstagram,
	facebook: faFacebook,
	viber: faViber,
}

type IconName = keyof typeof icons

export const SocialIcon = ({
	href,
	icon
}: {
	href: string
	icon: IconName
}) => {
	return (
		<Link
			href={href}
			target="_blank"
			rel="noopener noreferrer"
			aria-label={icon}
			className="flex items-center justify-center text-text/70 hover:text-text"
		>
			<FontAwesomeIcon
				icon={icons[icon]}
				className="fill-current transition-[fill] duration-300"
				width={40}
				height={40}
			/>
		</Link>
	)
}
