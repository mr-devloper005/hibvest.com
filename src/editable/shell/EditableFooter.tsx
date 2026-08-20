'use client'

import Link from 'next/link'
import type { CSSProperties } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/site-config'
import { globalContent } from '@/editable/content/global.content'
import { useEditableLocalAuthSession } from '@/editable/components/EditableLocalAuthForms'

export function EditableFooter() {
  const footerVars = { '--editable-footer-bg': '#f3f0fa', '--editable-footer-text': '#12156f', '--editable-border': '#12156f22', '--editable-container': '1180px' } as CSSProperties
  const year = new Date().getFullYear()
  const { session, logout } = useEditableLocalAuthSession()

  const siteLinks = [
    ['Business Listings', '/listing'],
    ['Search Directory', '/search'],
    ['Add Listing', session ? '/create' : '/signup'],
    ['Contact Us', '/contact'],
    ['About Us', '/about']
  ]

  const categories = [
    ['Services', '/listing?category=Services'],
    ['Home Repair', '/listing?category=Home Improvement'],
    ['Travel', '/listing?category=Travel'],
    ['Health', '/listing?category=Health'],
    ['Digital Marketing', '/listing?category=Digital']
  ]

  return (
    <footer style={footerVars} className="border-t border-[var(--editable-border)] bg-[var(--editable-footer-bg)] text-[var(--editable-footer-text)]">
      <div className="mx-auto max-w-[var(--editable-container)] px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-12 grid gap-5 rounded-xl border border-[#12156f] p-5 md:grid-cols-[0.85fr_1.15fr] md:items-center">
          <h2 className="text-2xl font-semibold tracking-tight">Subscribe to provider updates</h2>
          <form className="flex overflow-hidden rounded-xl border border-[var(--editable-border)] bg-white">
            <input type="email" placeholder="Enter your email" className="min-w-0 flex-1 px-4 py-3 text-sm text-[#161a3f] outline-none placeholder:text-[#6f7688]" />
            <button className="bg-[#ffb52e] px-6 text-sm font-black text-[#111111]" type="submit">Submit</button>
          </form>
        </div>

        <div className="grid gap-10 lg:grid-cols-[1.25fr_1fr_1fr_1fr]">
          <div>
            <Link href="/" className="inline-flex items-center gap-3">
              <img src="/favicon.png?v=20260413" alt={SITE_CONFIG.name} className="h-9 w-9 object-contain" />
              <span>
                <span className="block text-lg font-black uppercase leading-none tracking-[0.08em]">{SITE_CONFIG.name}</span>
                <span className="mt-1 block text-[11px] font-bold uppercase tracking-[0.32em] text-[#ffb52e]">{globalContent.footer.tagline}</span>
              </span>
            </Link>
            <p className="mt-4 max-w-md text-sm leading-7 opacity-70">{globalContent.footer.description || SITE_CONFIG.description}</p>
          </div>

          <div>
            <h3 className="text-xs font-black uppercase tracking-[0.22em] opacity-55">Site links</h3>
            <div className="mt-4 grid gap-2">
              {siteLinks.map(([label, href]) => (
                <Link key={href} href={href} className="inline-flex items-center gap-2 text-sm font-bold opacity-75 hover:opacity-100">
                  {label} <ArrowUpRight className="h-3.5 w-3.5" />
                </Link>
              ))}
              {session ? <button type="button" onClick={logout} className="text-left text-sm font-bold opacity-75 hover:opacity-100">Logout</button> : null}
            </div>
          </div>

          <div className="grid gap-10 lg:grid-cols-[1.25fr_1fr_1fr_1fr]"></div>

          <div>
            <h3 className="text-xs font-black uppercase tracking-[0.22em] opacity-55">Categories</h3>
            <div className="mt-4 grid gap-2">
              {categories.map(([label, href]) => (
                <Link key={href} href={href} className="inline-flex items-center gap-2 text-sm font-bold opacity-75 hover:opacity-100">
                  {label} <ArrowUpRight className="h-3.5 w-3.5" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-[var(--editable-border)] px-4 py-5 text-center text-xs font-bold opacity-55">
        © {year} {SITE_CONFIG.name}. All rights reserved.
      </div>
    </footer>
  )
}
