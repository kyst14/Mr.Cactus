"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function LogoutPage() {
	const [success, setSuccess] = useState<null | boolean>(null)

	const router = useRouter()

	const handleLogout = async () => {
		const res = await fetch('/api/auth/logout', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			}
		})

		if (res.ok) {
			setSuccess(true)
			setTimeout(() => {
				router.push('/')
			}, 1000)
		} else {
			setSuccess(false)
			console.error('Logout failed: ', (await res.json()) || 'Unknown error')
		}
	}

	return (
		<div className="flex flex-col items-center justify-center min-h-screen">
			{success === null ? (
				<div className="flex flex-col items-center justify-center min-h-screen">
					<h1 className="text-2xl font-bold mb-4">Logged Out</h1>
					<p>Are you sure you want to log out?</p>
					<button
						className="mt-4 px-6 py-1 cursor-pointer bg-primary text-white rounded hover:bg-primary-dark"
						onClick={handleLogout}
					>
						Log Out
					</button>
				</div>
			) : success ? (
				<div className="flex flex-col items-center justify-center min-h-screen">
					<h1 className="text-2xl font-bold mb-4">Successfully Logged Out</h1>
					<p>You have been logged out. You can close this page.</p>
				</div>
			) : (
				<div className="flex flex-col items-center justify-center min-h-screen">
					<h1 className="text-2xl font-bold mb-4">Logout Failed</h1>
					<p>There was an error logging out. Please try again.</p>
					
				</div>
			)}
		</div>
	)
}
