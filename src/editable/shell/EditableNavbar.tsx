'use client'

import { useMemo, useState, type CSSProperties } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, Search, UserPlus, LogIn, X, PlusCircle, UserCircle2 } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/site-config'
import { globalContent } from '@/editable/content/global.content'
import { useEditableLocalAuthSession } from '@/editable/components/EditableLocalAuthForms'

export function EditableNavbar() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const { session, logout } = useEditableLocalAuthSession()
  const navVars = { '--editable-nav-bg': '#ffffff', '--editable-nav-text': '#111111', '--editable-nav-active': '#ffb52e', '--editable-nav-active-text': '#111111', '--editable-cta-bg': '#ffb52e', '--editable-cta-text': '#111111', '--editable-search-bg': '#f7f8fc', '--editable-border': '#12156f22', '--editable-container': '1180px' } as CSSProperties
  const navItems = useMemo(
    () => SITE_CONFIG.tasks.filter((task) => task.enabled).map((task) => ({ label: task.label, href: task.route })),
    []
  )

  return (
    <header style={navVars} className="sticky top-0 z-50 border-b border-[var(--editable-border)] bg-[var(--editable-nav-bg)]/95 text-[var(--editable-nav-text)] backdrop-blur-2xl">
      <nav className="mx-auto flex min-h-[82px] w-full max-w-[var(--editable-container)] items-center gap-4 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="group flex shrink-0 items-center gap-3">
          <span className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-xl border border-[var(--editable-border)] bg-white shadow-sm transition-transform group-hover:-rotate-2">
            <img src="/favicon.png?v=20260413" alt={SITE_CONFIG.name} className="h-11 w-11 object-contain" />
          </span>
          <span className="hidden min-w-0 sm:block">
            <span className="block max-w-[180px] truncate text-base font-black uppercase leading-none tracking-[0.08em] text-[#12156f]">{SITE_CONFIG.name}</span>
            <span className="mt-1 block max-w-[180px] truncate text-[11px] font-bold uppercase tracking-[0.36em] text-[#ffb52e]">{globalContent.nav?.tagline || SITE_CONFIG.tagline}</span>
          </span>
        </Link>

        <form action="/search" className="mx-auto hidden min-w-0 flex-1 justify-center xl:flex">
          <label className="relative flex w-full max-w-md items-center rounded-xl border border-[var(--editable-border)] bg-[var(--editable-search-bg)] px-4 py-3 shadow-sm">
            <Search className="h-4 w-4 opacity-55" />
            <input name="q" type="search" placeholder="Search businesses" className="min-w-0 flex-1 bg-transparent px-3 text-sm font-semibold outline-none placeholder:text-current/45" />
          </label>
        </form>

        <div className="hidden items-center gap-1 lg:flex">
          {[{ label: 'Home', href: '/' }, ...navItems.slice(0, 3), { label: 'Search', href: '/search' }, { label: 'Contact', href: '/contact' }].map((item) => {
            const active = pathname === item.href || pathname.startsWith(`${item.href}/`)
            return (
              <Link key={item.href} href={item.href} className={`rounded-xl px-3 py-2 text-sm font-semibold transition ${active ? 'bg-[var(--editable-nav-active)] text-[var(--editable-nav-active-text)]' : 'hover:bg-black/5'}`}>
                {item.label}
              </Link>
            )
          })}
        </div>

        <div className="ml-auto flex shrink-0 items-center gap-2">
          {session ? (
            <>
              <span className="hidden max-w-[160px] items-center gap-2 truncate rounded-xl border border-[var(--editable-border)] bg-white px-3 py-2 text-sm font-black text-[#12156f] sm:inline-flex"><UserCircle2 className="h-4 w-4 shrink-0" /> <span className="truncate">{session.name}</span></span>
              <Link href="/create" className="hidden items-center gap-2 rounded-xl bg-[var(--editable-cta-bg)] px-4 py-2.5 text-sm font-black text-[var(--editable-cta-text)] shadow-sm sm:inline-flex"><PlusCircle className="h-4 w-4" /> Add Listing</Link>
              <button type="button" onClick={logout} className="hidden items-center gap-2 rounded-xl px-3 py-2 text-sm font-black hover:bg-black/5 sm:inline-flex">Logout</button>
            </>
          ) : (
            <>
              <Link href="/login" className="hidden items-center gap-2 rounded-xl bg-[var(--editable-cta-bg)] px-4 py-2.5 text-sm font-black text-[var(--editable-cta-text)] shadow-sm sm:inline-flex"><LogIn className="h-4 w-4" /> Login</Link>
              <Link href="/signup" className="hidden items-center gap-2 rounded-xl bg-[var(--editable-cta-bg)] px-4 py-2.5 text-sm font-black text-[var(--editable-cta-text)] shadow-sm sm:inline-flex"><UserPlus className="h-4 w-4" /> Add Listing</Link>
            </>
          )}
          <button type="button" onClick={() => setOpen((value) => !value)} className="rounded-xl border border-[var(--editable-border)] bg-white p-2 lg:hidden" aria-label="Toggle menu">
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {open ? (
        <div className="border-t border-[var(--editable-border)] bg-[var(--editable-nav-bg)] px-4 py-4 lg:hidden">
          <form action="/search" className="mb-4 flex rounded-xl border border-[var(--editable-border)] bg-[var(--editable-search-bg)] px-3 py-2">
            <Search className="mt-1 h-4 w-4 opacity-55" />
            <input name="q" type="search" placeholder="Search businesses" className="min-w-0 flex-1 bg-transparent px-3 text-sm outline-none" />
          </form>
          <div className="grid gap-2">
            {[{ label: 'Home', href: '/' }, ...navItems, { label: 'Search', href: '/search' }, { label: 'Contact', href: '/contact' }, ...(session ? [{ label: `Signed in as ${session.name}`, href: '/create' }, { label: 'Create listing', href: '/create' }] : [{ label: 'Login', href: '/login' }, { label: 'Add Listing', href: '/signup' }])].map((item) => (
              <Link key={`${item.href}-${item.label}`} href={item.href} onClick={() => setOpen(false)} className="rounded-xl border border-[var(--editable-border)] bg-white px-4 py-3 text-sm font-black">
                {item.label}
              </Link>
            ))}
            {session ? <button type="button" onClick={() => { logout(); setOpen(false) }} className="rounded-xl border border-[var(--editable-border)] bg-white px-4 py-3 text-left text-sm font-black">Logout</button> : null}
          </div>
        </div>
      ) : null}
    </header>
  )
}
