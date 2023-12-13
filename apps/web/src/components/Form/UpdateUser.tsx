'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { z } from 'zod'
import { useToast } from '../ui/use-toast'
import { updateUserAction } from '@/actions/users/update-user-action'
import { Github, Key, Mail } from 'lucide-react'

const updateUserInput = z.object({
	email: z.string().email().optional(),
	username: z.string().optional(),
	password: z.string().optional()
})

export type updateUserInput = z.infer<typeof updateUserInput>

const FormUpdateUser = ({ email, username }: { email: string, username: string }) => {
	const { toast } = useToast()
	const form = useForm<updateUserInput>({
		resolver: zodResolver(updateUserInput),
		defaultValues: {
			email,
			username,
		}
	})

	const handleUpdateUser = async (data: updateUserInput) => {
		const response = await updateUserAction(data)

		if(response?.error) {
			toast({
				description: response.error,
				variant: 'destructive'
			})
		}
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(handleUpdateUser)} className='grid w-full max-w-xl'>
				<header className='py-8'>
					<h2 className='text-4xl font-bold'>Atualização de Cadastro</h2>
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
					name="username"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Username</FormLabel>
							<FormControl>
								<div className='flex items-center bg-white px-4 py-2 rounded-full border'>
									<Github className='w-8 h-8 text-gray-500' />
									<Input type='text' placeholder='Usuário do Github' {...field} />
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

				<Button type='submit' className='mt-4'>Atualizar</Button>
			</form>
		</Form>
	)
}

export { FormUpdateUser }