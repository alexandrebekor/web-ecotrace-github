import { FormSignIn } from '@/components/Form/SignIn'
import Link from 'next/link'

const PageHome = () => {
	return (
		<main className='grid grid-cols-1 md:grid-cols-2 min-h-screen'>
			<section className='flex flex-col justify-between items-center p-8'>
				<div className='flex flex-col w-full items-center grow justify-center'>
					<FormSignIn />
				</div>
				<footer className='text-center'>
					Ainda não possui cadastro? <Link href={'/register'} className='text-blue-600 font-medium'>Cadastre-se</Link>
				</footer>
			</section>
			<div className='bg-gray-200 hidden md:flex'></div>
		</main>
	)
}

export default PageHome