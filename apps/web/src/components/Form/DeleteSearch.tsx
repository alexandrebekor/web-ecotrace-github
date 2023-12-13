'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { AlertTriangle, KeyRound, Mail, Trash2 } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { z } from 'zod'
import { useToast } from '../ui/use-toast'
import { signInAction } from '@/actions/sign-in-action'
import { deleteSearchAction } from '@/actions/searches/delete-search-action'

const deleteSearchInput = z.object({
	id: z.string(),
})

export type deleteSearchInput = z.infer<typeof deleteSearchInput>

const FormDeleteSearch = ({ id }: { id: string }) => {
	const { toast } = useToast()
	const form = useForm<deleteSearchInput>({
		resolver: zodResolver(deleteSearchInput),
		defaultValues: {
			id
		}
	})

	const handleSignIn = async (data: deleteSearchInput) => {
		const response = await deleteSearchAction(data)

		if(response?.error) {
			toast({
				description: response.error,
				variant: 'destructive'
			})
		}
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(handleSignIn)}>				
				<FormField
					control={form.control}
					name="id"
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<Input hidden type='text' {...field} className='hidden' />
							</FormControl>
							<FormMessage />
						</FormItem>
					)} />

				<button type='submit'><Trash2 className='h-5 w-5' /></button>
			</form>
		</Form>
	)
}

export { FormDeleteSearch }