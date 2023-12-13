'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { AlertTriangle, Github, Key, KeyRound, Mail } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { z } from 'zod'
import { useToast } from '../ui/use-toast'
import { signInAction } from '@/actions/sign-in-action'

const signInInput = z.object({
	email: z.string().email(),
	password: z.string().min(6)
})

export type signInInput = z.infer<typeof signInInput>

const FormSignIn = () => {
	const { toast } = useToast()
	const form = useForm<signInInput>({
		resolver: zodResolver(signInInput),
		defaultValues: {
			email: '',
			password: ''
		}
	})

	const handleSignIn = async (data: signInInput) => {
		const response = await signInAction(data)

		if(response?.error) {
			toast({
				description: response.error,
				variant: 'destructive'
			})
		}
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(handleSignIn)} className='grid w-full max-w-xl'>
				<header className='py-8'>
					<h2 className='text-4xl font-bold'>Ecotrace</h2>
				</header>
				
				<FormField
					control={form.control}
					name="email"
					render={({ field }) => (
						<FormItem>
							<FormLabel>E-mail</FormLabel>
							<FormControl>
								<div className='flex items-center bg-white px-4 py-2 rounded-full border'>
									<Mail className='w-8 h-8 text-gray-500' />
									<Input type='email' placeholder='Insira o e-mail' {...field} />
								</div>
							</FormControl>
							<FormMessage />
						</FormItem>
					)} />

				<FormField
					control={form.control}
					name="password"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Password</FormLabel>
							<FormControl>
								<div className='flex items-center bg-white px-4 py-2 rounded-full border'>
									<Key className='w-8 h-8 text-gray-500' />
									<Input type='password' placeholder='Insira a senha' {...field} />
								</div>
							</FormControl>
							<FormMessage />
						</FormItem>
					)} />

				<Button type='submit' className='mt-4'>Entrar</Button>
			</form>
		</Form>
	)
}

export { FormSignIn }