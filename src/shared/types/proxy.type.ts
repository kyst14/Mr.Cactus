import { NextRequest, NextResponse } from 'next/server'

export type ActionType = (
	req: NextRequest
) => NextResponse | Promise<NextResponse>

export type MethodType =
	| 'GET'
	| 'POST'
	| 'PUT'
	| 'DELETE'
	| 'PATCH'
	| 'HEAD'
	| 'OPTIONS'
	| '*'

// ["path", "path2"] or [ { path: "path", method: "GET" }, { path: "path2", method: [ "GET", "POST" ] } ]
type ConfigItem = {
	path: string | string[] // Single path or array of paths (supports wildcards like "/api/*")
	excludes?: string | string[] // Optional: paths to exclude from this rule
	method?: MethodType | MethodType[] // ["GET", "POST"] OR if "*", include all
	action: ActionType // Function to execute if path and method match
}

export type ConfigType = ConfigItem[]