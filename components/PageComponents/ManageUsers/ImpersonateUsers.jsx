import React, { useState } from 'react'
import HeroBanner from '../../UI/HeroBanner/HeroBanner'
import UsersList from './UserList/UsersList'
import { useSession } from 'next-auth/react'
import NotAuthorized from '../../UI/NotAuthorized/NotAuthorized'

const ImpersonateUsers = ({ impersonate }) => {
	const [initialData, setinitialData] = useState(impersonate?.impersonate_users?.data)
	const [currentPage, setcurrentPage] = useState(impersonate?.impersonate_users?.current_page)
	const [lastPage, setlastPage] = useState(impersonate?.impersonate_users?.last_page)
	const [hasMoreData, sethasMoreData] = useState(true)

	const { data: session } = useSession()

	return session?.user?.id ? (
		<>
			<HeroBanner pageType='single_col' title={'Impersonate Users'} />
			<UsersList positions={impersonate?.positions} data={initialData} setinitialData={setinitialData} currentPage={currentPage} setcurrentPage={setcurrentPage} lastPage={lastPage} setlastPage={setlastPage} hasMoreData={hasMoreData} sethasMoreData={sethasMoreData} />
		</>
	) : (
		<NotAuthorized heading='Sign in is required to access this page.' />
	)
}

export default ImpersonateUsers
