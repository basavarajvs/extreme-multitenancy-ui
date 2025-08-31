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
      canAccessWarehouseUserModule: true,
      canAccessWarehouseAdminModule: true,
    };
  }

  return {
    canAdmin: currentUser && currentUser.access === 'admin',
    canAccessWarehouseUserModule:
      currentUser &&
      currentUser.permissions?.includes('access_warehouse_user_module'),
    canAccessWarehouseAdminModule:
      currentUser &&
      currentUser.permissions?.includes('manage_warehouse_admin'),
  };
}
