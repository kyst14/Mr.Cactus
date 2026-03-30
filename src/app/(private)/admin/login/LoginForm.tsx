'use client'

import { LoginInput } from '@/components/LoginInput'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export const LoginForm = () => {
	const [error, setError] = useState<string>('')
	const [user, setUser] = useState({
		username: '',
		password: ''
	})

	const router = useRouter()

	const handleLogin = async (e: React.SubmitEvent<HTMLFormElement>) => {
		e.preventDefault()

		setError('')

		try {
			const response = await fetch('/api/auth/login', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(user)
			})

			if (response.ok) {
				// Redirect to admin dashboard
				router.push('/admin')
			} else {
				const data = await response.json()
				setError('Error: ' + data.data)
			}
		} catch (error) {
			console.error(error)
			if (error instanceof Error) {
				setError(error.message)
			} else {
				setError('Something went wrong')
			}
		}
	}

	return (
		<div>
			<form
				className="flex flex-col gap-10 bg-bg p-10 rounded-lg shadow-lg shadow-primary/40"
				onSubmit={handleLogin}
			>
				<h1 className="text-2xl font-bold font-heading text-center">
					Admin Login
				</h1>

				<LoginInput
					name="username"
					type="text"
					placeholder="admin"
					onChange={e =>
						setUser({ ...user, username: e.target.value })
					}
				/>

				<LoginInput
					name="password"
					type="password"
					placeholder="123456"
					onChange={e =>
						setUser({ ...user, password: e.target.value })
					}
				/>

				<button
					type="submit"
					className="bg-primary text-bg p-2 rounded-lg border-2 border-primary cursor-pointer hover:bg-transparent hover:text-primary transition-colors duration-300 font-bold tracking-wide font-sans"
				>
					Login
				</button>
			</form>

			{error && (
				<div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 text-red-500 font-bold bg-red-200 p-2 rounded-lg animate-bounce text-center sm:w-1/2 md:w-1/4 w-full">
					{error}
				</div>
			)}
		</div>
	)
}
