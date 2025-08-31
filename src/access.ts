/**
 * @see https://umijs.org/docs/max/access#access
 * */
export default function access(
  initialState: { currentUser?: API.CurrentUser } | undefined,
) {
  const { currentUser } = initialState ?? {};
  
  // In development mode, allow access to admin features
  if (process.env.NODE_ENV === 'development') {
    return {
      canAdmin: true,
    };
  }
  
  return {
    canAdmin: currentUser && currentUser.access === 'admin',
  };
}
