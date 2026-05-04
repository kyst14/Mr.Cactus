'use client'

import { useState } from 'react'

export const PopoverItem = ({
	label,
	value,
	type = 'text',
	options = [],
	disabled = false
}: {
	label: string
	value?: string | number
	options?: string[]
	type?: React.HTMLInputTypeAttribute | 'select'
	disabled?: boolean
}) => {
	const isPassword = type.toLowerCase() === 'password'

	const [inputValue, setInputValue] = useState(isPassword ? '' : value || '')

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setInputValue(e.currentTarget.value)
	}

	return (
		<li>
			<span className="font-semibold">{label}:</span>
			{type === 'select' ? (
				<select
					name={label.toLowerCase()}
					id={label.toLowerCase()}
					className={`ml-2 p-1 border border-text/30 rounded w-full bg-text/3 focus:outline-none focus:ring-2 focus:ring-primary ${disabled ? 'cursor-not-allowed' : ''} ${value !== inputValue ? 'ring-2 ring-secondary' : ''}`}
					onChange={e => setInputValue(e.currentTarget.value)}
					disabled={disabled}
					value={inputValue}
				>
					{options.map(option => (
						<option key={option} value={option}>
							{option}
						</option>
					))}
				</select>
			) : (
				<input
					type={type}
					value={inputValue}
					placeholder={isPassword ? '•••••••••••' : ''}
					name={label.toLowerCase()}
					id={label.toLowerCase()}
					className={`ml-2 p-1 border border-text/30 rounded w-full bg-text/3 focus:outline-none focus:ring-2 focus:ring-primary ${disabled ? 'cursor-not-allowed' : ''} ${value !== inputValue ? 'ring-2 ring-secondary' : ''}`}
					onChange={handleChange}
					disabled={disabled}
					onFocus={() => {
						if (
							type.toLowerCase() === 'password' &&
							inputValue === ''
						) {
							setInputValue('')
						}
					}}
				/>
			)}
		</li>
	)
}
