'use client'

import { useRouter, useSearchParams } from 'next/navigation'

export const SearchInput = () => {
	const router = useRouter()

	const searchParams = useSearchParams()
	const search = searchParams.get('search') // set to value in input

	const redirect = (e: React.ChangeEvent<HTMLInputElement>): void => {
		const search = e.currentTarget.value

		const params = new URLSearchParams(searchParams.toString())

		if (search) {
			params.set('search', search)
		} else {
			params.delete('search')
		}

		router.push(`/catalog?${params}`)
	}

	return (
		<form
			action="/catalog"
			method="get"
			role="search"
			className="relative"
			onSubmit={e => e.preventDefault()}
		>
			<div className="flex items-center w-full gap-2 border border-text rounded-full has-focus-within:border-primary">
				<input
					type="text"
					placeholder="Search"
					className=" border-none outline-none placeholder:text-text/60 text-text h-full w-full px-5"
					name="search"
					onChange={redirect}
					defaultValue={search ?? ''}
					id="search"
				/>

				<button
					type="submit"
					className="flex items-center justify-center h-full bg-primary/60 hover:bg-primary px-5 py-2 rounded-r-full hover:text-bg cursor-pointer"
					name="search-btn"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						height="24px"
						viewBox="0 -960 960 960"
						width="24px"
						fill="#e3e3e3"
					>
						<path
							d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z"
							className="fill-current"
						/>
					</svg>
				</button>
			</div>
		</form>
	)
}
