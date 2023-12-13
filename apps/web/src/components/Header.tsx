import { getCurrentUserAction } from '@/actions/users/get-current-user-action'
import { FormSignOut } from './Form/SignOut'
import Image from 'next/image'

const Header = async () => {
	const profile: UserProfile = await getCurrentUserAction()

	return (
		<header className='flex sticky top-3 justify-between items-center py-4 px-8 m-4 rounded-md bg-white shadow-sm border'>
			<a href='/' className='text-2xl font-bold md:text-3xl'>EcoHub</a>
			<div className='flex gap-4 items-center'>
				<div className='flex flex-col items-end'>
					<span className='text-sm text-semibold md:text-lg leading-none'>{profile.username}</span>
					<FormSignOut />
				</div>
				<a href={`/admin/${profile.username}/details`}>
					<Image src={profile.avatar_url} alt={profile.name} height={60} width={60} className='rounded-full' />
				</a>
			</div>
		</header>
	)
}

export { Header }