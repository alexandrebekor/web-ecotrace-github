import { signOut } from '@/auth'

const FormSignOut = () => {
	return (
		<form action={async () => {
			'use server'

			await signOut({
				redirect: true,
				redirectTo: '/'
			})
		}}>
			<button className='text-sm underline'>Sair</button>
		</form>
	)
}

export { FormSignOut }