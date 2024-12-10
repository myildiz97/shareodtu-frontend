import { MainNav } from './main-nav'
import { UserNav } from './user-nav'

const navItems = [
  {
    title: "Vendor List",
    href: "/vendors",
  },
]

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full h-14 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-4 xl:px-0">
      <div className="flex h-full items-center">
        <MainNav className="hidden sm:flex sm:flex-1" items={navItems} />
        <div className="w-full sm:w-fit flex items-center justify-between sm:justify-end">
          <div className="w-full flex-1 sm:w-auto sm:flex-none">
            <MainNav className="sm:hidden" items={navItems} />
          </div>
          <UserNav />
        </div>
      </div>
    </header>
  )
}

