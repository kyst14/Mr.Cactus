export const LoginInput = ({
	name,
	type,
	placeholder,
	value,
	required,
	onChange
}: {
	name: string
	type?: string
	placeholder?: string
	value?: string
	required?: boolean,
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}) => {
	return (
		<div className="flex flex-col gap-2">
			<label htmlFor={name}>{name[0].toUpperCase() + name.slice(1)}</label>
			<input
				type={type}
				name={name}
				placeholder={placeholder}
				value={value}
				required={required || false}
				className="border-b border-text outline-none placeholder:text-text/60 text-text h-full w-full px-2"
				onChange={onChange}
			/>
		</div>
	)
}
