import { UUID } from 'crypto'

export type TypesPop =
	| 'addAdmin'
	| 'editAdmin'
	| 'deleteAdmin'
	| 'addProduct'
	| 'editProduct'
	| 'deleteProduct'

type AdminData = {
	id: UUID
	username: string
	role: string
	blocked: boolean
	created_at: string
}

type ProductData = {
	id: UUID
	name: string
	description: string
	price: number
	created_at: string
}

export type PopData = AdminData | ProductData | Record<string, never>

export type PopTypeAdmin =
	| { type: 'addAdmin'; data: AdminData }
	| { type: 'editAdmin'; data: AdminData }

export type PopTypeProduct =
	| { type: 'addProduct'; data: ProductData }
	| { type: 'editProduct'; data: ProductData }

export type PopType = PopTypeAdmin | PopTypeProduct
