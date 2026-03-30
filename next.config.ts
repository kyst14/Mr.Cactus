import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
	allowedDevOrigins:
		process.env.ALLOWED_ORIGINS?.split(',').map(origin => origin.trim()) ||
		[],
	reactStrictMode: true,
}

export default nextConfig
