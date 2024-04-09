import { PropsWithChildren } from 'react'

const AuthProvider = ({children} :PropsWithChildren) => {
  // some logic here to check path name and redirect if necessary
  return (
    <div className='my-4 p-2'>{children}</div>
  )
}

export default AuthProvider
