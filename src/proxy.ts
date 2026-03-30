import { configAdmin } from '@/lib/proxy/admin'
import { ConfigType, MethodType } from '@/shared/types/proxy.type'
import { NextResponse, type NextRequest } from 'next/server'

function methodMatches(
	reqMethod: string,
	configMethod?: MethodType | MethodType[]
): boolean {
	if (!configMethod || configMethod === '*' || configMethod === reqMethod) {
		return true
	}

	if (Array.isArray(configMethod)) {
		return (
			configMethod.includes('*') ||
			configMethod.includes(reqMethod as MethodType)
		)
	}

	return false
}

function pathMatches(pathname: string, pathPattern: string): boolean {
	const cleanPattern = pathPattern.replace(/\/$/, '')
	const cleanPathname = pathname.replace(/\/$/, '')

	// Handle wildcard patterns: "/api/:path*" or "/api/*"
	if (cleanPattern.endsWith('/:path*') || cleanPattern.endsWith('/*')) {
		const basePath = cleanPattern.replace('/:path*', '').replace('/*', '')

		return cleanPathname === basePath || cleanPathname.startsWith(basePath)
	}

	// Exact match
	return cleanPathname === cleanPattern
}

function isExcluded(pathname: string, excludes?: string | string[]): boolean {
	if (!excludes) return false

	const excludeList = Array.isArray(excludes) ? excludes : [excludes]
	const cleanPathname = pathname.replace(/\/$/, '')

	for (const excludePattern of excludeList) {
		const cleanExclude = excludePattern.replace(/\/$/, '')

		if (cleanExclude.endsWith('/:path*') || cleanExclude.endsWith('/*')) {
			const baseExclude = cleanExclude
				.replace('/:path*', '')
				.replace('/*', '')
			if (
				cleanPathname === baseExclude ||
				cleanPathname.startsWith(baseExclude + '/')
			) {
				return true
			}
		} else if (cleanPathname === cleanExclude) {
			return true
		}
	}
	return false
}

function checkConfig(
	req: NextRequest,
	config: ConfigType
): NextResponse | Promise<NextResponse> | undefined {
	const { pathname } = req.nextUrl
	const { method } = req
	const reqMethod = method as MethodType

	for (const item of config) {
		const paths = Array.isArray(item.path) ? item.path : [item.path]

		// Skip excluded paths
		if (isExcluded(pathname, item.excludes)) {
            continue
        }

		// Check method
		if (!methodMatches(reqMethod, item.method)) {
			continue
		}

		// Check path
		for (const pathPattern of paths) {
			if (pathMatches(pathname, pathPattern)) {
				return item.action(req)
			}
		}
	}

	return undefined
}

export function proxy(req: NextRequest) {
	const configs: ConfigType[] = [configAdmin]

	for (const config of configs) {
		const result = checkConfig(req, config)
		if (result) {
			return result
		}
	}

	// No matching config -> continue normally
	return NextResponse.next()
}

export const config = {
	matcher: ['/((?!_next/static|_next/image|favicon.ico).*)']
}
