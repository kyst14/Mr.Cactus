import { AdminType, ProductType } from '@/lib/database'

export type TypesPop =
	| 'addAdmin'
	| 'editAdmin'
	| 'deleteAdmin'
	| 'addProduct'
	| 'editProduct'
	| 'deleteProduct'


export type PopData = AdminType | ProductType | Record<string, never>

export type PopTypeAdmin =
	| { type: 'addAdmin'; data?: AdminType }
	| { type: 'editAdmin'; data: AdminType }

export type PopTypeProduct =
	| { type: 'addProduct'; data: ProductType }
	| { type: 'editProduct'; data: ProductType }

export type PopType = PopTypeAdmin | PopTypeProduct
