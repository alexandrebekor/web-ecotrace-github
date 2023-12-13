import Link from 'next/link'
import { FormSignUp } from '@/components/Form/SignUp'

const PageRegister = () => {
	return (
		<main className='grid grid-cols-1 md:grid-cols-2 min-h-screen'>
			<section className='flex flex-col justify-between items-center p-8'>
				<div className='flex flex-col w-full items-center grow justify-center'>
					<FormSignUp />
				</div>
				<footer className='text-center'>
					Já possui cadastro? <Link href={'/'} className='text-blue-600 font-medium'>Entrar</Link>
				</footer>
			</section>
			<div className='bg-gray-200 hidden md:flex'></div>
		</main>
	)
}

export default PageRegister