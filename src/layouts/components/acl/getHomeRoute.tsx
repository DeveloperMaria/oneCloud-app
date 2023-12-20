/**
 *  Set Home URL based on User Roles
 */
const getHomeRoute = (role: string) => {
  if (role === '') return '/acl'
  else return '/home'
}

export default getHomeRoute
