'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Github } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import { Button } from '../ui/button'

import { z } from 'zod'
import { useToast } from '../ui/use-toast'
import { getSearchAction } from '@/actions/searches/get-search-action'

const getSearchInput = z.object({
	username: z.string().min(1)
})

export type getSearchInput = z.infer<typeof getSearchInput>

const FormGetSearch = () => {
	const { toast } = useToast()

	const form = useForm<getSearchInput>({
		resolver: zodResolver(getSearchInput),
		defaultValues: {
			username: ''
		}
	})

	const handleCreateSearch = async (data: getSearchInput) => {
		const response = await getSearchAction(data)

		if(response?.error) {
			toast({
				description: response.error,
				variant: 'destructive'
			})

			return
		}
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(handleCreateSearch)} className='grid w-full max-w-xl'>
				<header className='pt-8 pb-4 text-center'>
					<h2 className='text-4xl font-semibold'>Faça novas Conexões</h2>
				</header>

				<FormField
					control={form.control}
					name="username"
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<div className='flex items-center bg-white px-4 py-2 rounded-full border'>
									<Github className='w-8 h-8 text-gray-500' />
									<Input placeholder='Insira o nome do usuário' {...field} />
								</div>
							</FormControl>
							<FormMessage />
						</FormItem>
					)} />

				<Button type='submit' className='mt-4' variant='rounded'>Buscar</Button>
			</form>
		</Form>
	)
}

export { FormGetSearch }