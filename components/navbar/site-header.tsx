import { makeRequest } from '@/lib/make-request'
import { MainNav } from './main-nav'
import { UserNav } from './user-nav'
import { EUserType, IUser } from '@/lib/types'

const navItemsForDefault = [
  {
    title: "Vendors",
    href: "/vendors",
  },
]

const navItemsForVendor = [
  {
    title: "Food List",
    href: "/vendors",
  },
]

export async function SiteHeader() {
  const me = await makeRequest('users/me', 'GET') as IUser;
  const navItems = me.user_type === EUserType.VENDOR ? navItemsForVendor : navItemsForDefault;
  const homeActive = me.user_type !== EUserType.VENDOR;

  return (
    <header className="sticky top-0 z-50 w-full h-14 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-4 xl:px-0">
      <div className="flex h-full items-center justify-end">
        <MainNav className="hidden sm:flex sm:flex-1" items={navItems} homeActive={homeActive} />
        <div className="w-full sm:w-fit flex items-center justify-between sm:justify-end">
          <div className="w-full flex-1 sm:w-auto sm:flex-none">
            <MainNav className="sm:hidden" items={navItems} homeActive={homeActive} />
          </div>
          <UserNav />
        </div>
      </div>
    </header>
  )
}

