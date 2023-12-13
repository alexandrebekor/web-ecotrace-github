import { Account } from '@/@types/accounts'
import { getUserDetailsAction } from '@/actions/searches/get-user-details-action'
import { getCurrentUserAction } from '@/actions/users/get-current-user-action'
import { auth } from '@/auth'
import { FormUpdateUser } from '@/components/Form/UpdateUser'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { formatUrl } from '@/utils/format-url'
import { Link, Mail, Newspaper, Store, Twitter } from 'lucide-react'
import Image from 'next/image'
import { redirect } from 'next/navigation'
import { URL } from 'url'

const PageDetails = async ({ params }: { params: { search: string }}) => {
	const currentUser = await getCurrentUserAction()
	const getUserDetails : Account & { error: string } = await getUserDetailsAction({
		username: params.search
	})

	if(getUserDetails?.error) {
		redirect('/admin')
	}

	return (
		<div className='px-6'>
			<header className='flex flex-col md:flex-row justify-between'>
				<div className='flex justify-center items-center gap-2'>
					<Image src={getUserDetails.avatar_url} alt={getUserDetails.login} height={60} width={60} className='rounded-full' />
					<div className='flex flex-col'>
						<strong className='font-semibold'>{getUserDetails.name}</strong>
						<span className='leading-none text-sm'>{getUserDetails.login}</span>
					</div>
				</div>
			
				<section className='grid grid-cols-3 gap-4'>
					<div className='text-center'>
						<p className='text-2xl font-bold text-gray-800'>{getUserDetails.followers}</p>
						<span className='text-sm'>Followers</span>
					</div>
					<div className='text-center'>
						<p className='text-2xl font-bold text-gray-800'>{getUserDetails.following}</p>
						<span className='text-sm'>Following</span>
					</div>
					<div className='text-center'>
						<p className='relative text-2xl font-bold text-gray-800'>
							<a href={`/admin/${getUserDetails.login}`}>
								<span className='text-primary'>{getUserDetails.public_repos}</span>
							</a>
							<span className='absolute top-0 bg-primary p-1 rounded-full text-white'>
								<a href={`/admin/${getUserDetails.login}`}>
									<Link className='h-3 w-3' />
								</a>
							</span>
						</p>
						<span className='text-sm'>Repositories</span>
					</div>
				</section>
			</header>

			<section className='flex flex-col-reverse md:grid md:grid-cols-4 pt-8 pb-4'>
				<div className='flex flex-col px-4 gap-4'>
					<div className='flex items-center gap-2'>
						<Mail className='text-gray-600 w-5 h-5' />
						<span className={`text-sm truncate ${getUserDetails.email ?? 'text-red-900 font-semibold'}`}>{getUserDetails.email ?? 'No content available.'}</span>
					</div>
					<div className='flex items-center gap-2'>
						<Twitter className='text-gray-600 w-5 h-5' />
						<span className={`text-sm truncate ${getUserDetails.twitter_username ?? 'text-red-900 font-semibold'}`}>{getUserDetails.twitter_username ?? 'No content available.'}</span>
					</div>
					<div className='flex items-center gap-2'>
						<Store className='text-gray-600 w-5 h-5' />
						<span className={`text-sm truncate ${getUserDetails.company ?? 'text-red-900 font-semibold'}`}>{getUserDetails.company ?? 'No content available.'}</span>
					</div>
					<div className='flex items-center gap-2'>
						<Newspaper className='text-gray-600 w-5 h-5' />
						{getUserDetails.blog ? (
							<a href={formatUrl(getUserDetails.blog)} target='_blank'>
								<span className='text-sm truncate text-primary'>{getUserDetails.blog}</span>
							</a>
						) : <span className="text-sm truncate text-red-900 font-semibold">No content available.</span>
						}
					</div>

					{getUserDetails.login === currentUser.username ? (
						<Dialog>
							<DialogTrigger asChild>
								<Button>Editar Perfil</Button>
							</DialogTrigger>
							<DialogContent className='flex justify-center'>
								<FormUpdateUser email={currentUser.email} username={currentUser.username} />
							</DialogContent>
						</Dialog>
					): null}

				</div>
				<p className={`col-span-3 bg-gray-300 rounded-md border-2 border-dashed p-4 mb-4 ${getUserDetails.bio ?? 'text-red-900 font-semibold'}`}>{getUserDetails.bio ?? 'No content available.' }</p>
			</section>
		</div>
	)
}

export default PageDetails