import Link from 'next/link'
import { ArrowRight, BadgeCheck, Building2, Car, CircleDollarSign, Heart, MapPin, Plug, Search, Sparkles, Star, Store, UsersRound } from 'lucide-react'
import type { SitePost } from '@/lib/site-connector'
import type { HomeTimeSection } from '@/lib/task-data'
import type { TaskKey } from '@/lib/site-config'
import { SITE_CONFIG } from '@/lib/site-config'
import { pagesContent } from '@/editable/content/pages.content'
import { editableDesignContract as dc } from '@/editable/layouts/design-contract'
import { getEditablePostImage, postHref } from '@/editable/cards/PostCards'

type HomeSectionProps = {
  primaryTask: TaskKey
  primaryRoute: string
  posts: SitePost[]
  timeSections: HomeTimeSection[]
}

const fallbackImages = [
  '/images/fallback1.jpg',
  '/images/fallback2.jpg',
  '/images/fallback3.jpg',
  '/images/fallback4.jpg',
  '/images/fallback5.jpg',
]

function getContent(post?: SitePost | null) {
  return post?.content && typeof post.content === 'object' ? post.content as Record<string, unknown> : {}
}

function text(value: unknown) {
  return typeof value === 'string' ? value.trim() : ''
}

function excerpt(post?: SitePost | null, limit = 130) {
  const content = getContent(post)
  const raw = text(content.description) || text(content.summary) || post?.summary || 'A verified local provider with service details, location, and quick contact information.'
  const clean = raw.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim()
  return clean.length > limit ? `${clean.slice(0, limit).trim()}...` : clean
}

function field(post: SitePost, names: string[], fallback = '') {
  const content = getContent(post)
  for (const name of names) {
    const value = text(content[name])
    if (value) return value
  }
  return fallback
}

function taskLabel(task: TaskKey) {
  return SITE_CONFIG.tasks.find((item) => item.key === task)?.label || 'Business Listings'
}

function listingRoute(primaryTask: TaskKey, primaryRoute: string) {
  const listing = SITE_CONFIG.tasks.find((task) => task.key === 'listing')
  return listing?.route || (primaryTask === 'listing' ? primaryRoute : '/listing')
}

function providerPosts(posts: SitePost[]) {
  return posts.length ? posts : []
}

function CategoryTile({ title, icon: Icon, query, image }: { title: string; icon: typeof Store; query: string; image?: string }) {
  return (
    <Link href={`/search?q=${encodeURIComponent(query)}`} className="group block text-center">
      <div className="relative mx-auto aspect-[1.12/1] max-w-[210px] overflow-hidden rounded-xl bg-[#e8ecf4] shadow-sm ring-1 ring-[#12156f14]">
        {image ? <img src={image} alt="" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" /> : null}
        <div className="absolute inset-0 bg-gradient-to-t from-[#12156f]/35 to-transparent opacity-0 transition group-hover:opacity-100" />
        <span className="absolute left-3 top-3 flex h-9 w-9 items-center justify-center rounded-lg bg-[#ffb52e] text-[#111111] shadow-sm"><Icon className="h-5 w-5" /></span>
      </div>
      <h3 className="mt-3 text-base font-black text-[#12156f]">{title}</h3>
    </Link>
  )
}

function ProviderCard({ post, href, featured = false }: { post: SitePost; href: string; featured?: boolean }) {
  const location = field(post, ['location', 'city', 'address'], 'Local service area')
  const category = field(post, ['category', 'serviceType'], post.tags?.[0] || 'Business')
  return (
    <Link href={href} className={`group relative block rounded-xl bg-[#12156f] p-3 pb-0 shadow-[0_18px_45px_rgba(18,21,111,0.16)] transition duration-300 hover:-translate-y-1 ${featured ? 'lg:-translate-y-4' : ''}`}>
      <article className="rounded-xl bg-white p-5 text-center ring-1 ring-[#12156f12]">
        <div className="flex items-center justify-between">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#ffb52e] text-[#111111]"><BadgeCheck className="h-4 w-4" /></span>
          <Heart className="h-6 w-6 text-[#7f35ff]" />
        </div>
        <h3 className="mt-2 line-clamp-1 text-lg font-black text-[#12156f]">{post.title}</h3>
        <p className="mt-1 line-clamp-1 text-sm font-bold text-[#666]">{location}</p>
        <div className="mx-auto mt-5 aspect-[4/3] w-full max-w-[260px] overflow-hidden rounded-xl bg-[#e8ecf4]">
          <img src={getEditablePostImage(post)} alt="" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
        </div>
        <p className="mx-auto mt-5 line-clamp-3 max-w-[280px] text-sm leading-7 text-[#545b70]">{excerpt(post, 120)}</p>
        <div className="mt-4 flex justify-center gap-1 text-[#ffb52e]">
          {[0, 1, 2, 3].map((item) => <Star key={item} className="h-4 w-4 fill-current" />)}
          <Star className="h-4 w-4 text-[#aab0c2]" />
        </div>
        <p className="mt-3 text-xs font-black uppercase tracking-[0.18em] text-[#12156f]/50">{category}</p>
      </article>
      <div className="flex h-16 items-center justify-center text-sm font-black text-white">View Business</div>
    </Link>
  )
}

export function EditableHomeHero({ primaryTask, primaryRoute, posts }: HomeSectionProps) {
  const route = listingRoute(primaryTask, primaryRoute)
  const heroImages = [posts[0], posts[1], posts[2]].map((post, index) => post ? getEditablePostImage(post) : fallbackImages[index])

  return (
    <section className="relative overflow-hidden bg-white">
      <div className="mx-auto grid max-w-[1180px] gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:px-8 lg:py-16">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.28em] text-[#ffb52e]">{pagesContent.home.hero.badge}</p>
          <h1 className="mt-5 max-w-xl text-5xl font-black leading-[1.03] tracking-tight text-[#12156f] sm:text-6xl">{pagesContent.home.hero.title.join(' ')}</h1>
          <p className="mt-5 max-w-xl text-base leading-8 text-[#545b70]">{pagesContent.home.hero.description}</p>
          <form action="/search" className="mt-8 grid gap-3 rounded-xl bg-white p-3 shadow-[0_20px_70px_rgba(18,21,111,0.12)] ring-1 ring-[#12156f18] sm:grid-cols-[1fr_auto]">
            <label className="flex items-center gap-3 rounded-xl border border-[#12156f18] px-4 py-3">
              <Search className="h-5 w-5 text-[#9aa0b6]" />
              <input name="q" placeholder={pagesContent.home.hero.searchPlaceholder} className="min-w-0 flex-1 bg-transparent text-sm font-bold text-[#161a3f] outline-none placeholder:text-[#6f7688]" />
            </label>
            <button className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#ffb52e] px-6 py-3 text-sm font-black text-[#111111]" type="submit">Find Provider <ArrowRight className="h-4 w-4" /></button>
          </form>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href={route} className={dc.button.primary}>Browse {taskLabel('listing' as TaskKey)} <ArrowRight className="h-4 w-4" /></Link>
            <Link href="/create" className={dc.button.accent}>Add Listing</Link>
          </div>
        </div>
        <div className="relative min-h-[470px] overflow-hidden rounded-bl-[5rem] rounded-tl-xl rounded-tr-xl bg-[#12156f] p-5 text-white">
          <div className="grid h-full min-h-[430px] grid-cols-2 gap-3">
            <img src={heroImages[0]} alt="" className="h-full min-h-[220px] rounded-xl object-cover opacity-55" />
            <img src={heroImages[1]} alt="" className="h-full min-h-[220px] rounded-xl object-cover opacity-55" />
            <img src={heroImages[2]} alt="" className="col-span-2 h-full min-h-[190px] rounded-xl object-cover opacity-55" />
          </div>
          <div className="absolute inset-0 bg-[#12156f]/55" />
          <div className="absolute inset-x-8 bottom-10 text-center">
            <p className="text-4xl font-light">Find <span className="text-[#ffb52e]">Businesses</span> </p>
            
            <div className="mx-auto mt-5 h-px max-w-sm bg-[#ffb52e]" />
          </div>
        </div>
      </div>
    </section>
  )
}

export function EditableStoryRail({ primaryTask, primaryRoute, posts }: HomeSectionProps) {
  const route = listingRoute(primaryTask, primaryRoute)
  const categories = [
    { title: 'Cleaning Services', icon: Sparkles, query: 'cleaning', image: posts[0] ? getEditablePostImage(posts[0]) : undefined },
    { title: 'Transport', icon: Car, query: 'transport', image: posts[1] ? getEditablePostImage(posts[1]) : undefined },
    { title: 'Health', icon: Store, query: 'health', image: posts[2] ? getEditablePostImage(posts[2]) : undefined },
    { title: 'Home Repair', icon: Plug, query: 'home improvement', image: posts[3] ? getEditablePostImage(posts[3]) : undefined },
    { title: 'Business', icon: Building2, query: 'business', image: posts[4] ? getEditablePostImage(posts[4]) : undefined },
  ]

  return (
    <section className="bg-white py-14">
      <div className="mx-auto max-w-[1180px] px-4 sm:px-6 lg:px-8">
        <div className="grid gap-4 md:grid-cols-[0.9fr_1fr] md:items-end">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.28em] text-[#ffb52e]">Categories</p>
            <h2 className="mt-3 text-4xl font-black tracking-tight text-[#12156f]">Popular Categories</h2>
          </div>
          <p className="max-w-xl text-base leading-8 text-[#545b70]">Start with the service you need, then compare nearby providers by location, summary, and contact details.</p>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {categories.map((category) => <CategoryTile key={category.title} {...category} />)}
        </div>
        <div className="mt-10 text-center">
          <Link href={route} className="inline-flex items-center gap-3 text-sm font-black uppercase tracking-[0.18em] text-[#ffb52e]">Browse all categories <ArrowRight className="h-4 w-4" /></Link>
        </div>
      </div>
    </section>
  )
}

export function EditableMagazineSplit({ primaryTask, primaryRoute, posts }: HomeSectionProps) {
  const route = listingRoute(primaryTask, primaryRoute)
  const providers = providerPosts(posts).slice(0, 3)
  if (!providers.length) return null
  return (
    <section className="bg-[#eef2f7] py-16">
      <div className="mx-auto max-w-[1180px] px-4 sm:px-6 lg:px-8">
        <div className="grid gap-4 md:grid-cols-[0.9fr_1fr] md:items-end">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.28em] text-[#ffb52e]">Vendor</p>
            <h2 className="mt-3 text-4xl font-black tracking-tight text-[#12156f]">Featured Providers</h2>
          </div>
          <p className="max-w-xl text-base leading-8 text-[#545b70]">A quick look at businesses with useful descriptions, visible locations, and simple paths to request more information.</p>
        </div>
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {providers.map((post, index) => <ProviderCard key={post.id || post.slug} post={post} href={postHref('listing' as TaskKey, post, route)} featured={index === 1} />)}
        </div>
      </div>
    </section>
  )
}

export function EditableTimeCollections({ primaryTask, primaryRoute, posts }: HomeSectionProps) {
  const route = listingRoute(primaryTask, primaryRoute)
  const picks = posts.slice(3, 7)
  return (
    <section className="bg-white py-16">
      <div className="mx-auto grid max-w-[1180px] gap-10 px-4 sm:px-6 lg:grid-cols-[0.92fr_1.08fr] lg:items-center lg:px-8">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.28em] text-[#ffb52e]">Choose</p>
          <h2 className="mt-3 text-4xl font-black tracking-tight text-[#12156f]">Why Choose Us</h2>
          <p className="mt-5 max-w-xl text-base leading-8 text-[#545b70]">The directory is shaped for practical discovery: find a provider, understand what they offer, and move to contact without unnecessary page noise.</p>
          <div className="mt-8 grid gap-5">
            {[
              { icon: UsersRound, title: 'Meet new customers', body: 'Provider pages make services, location, and business identity easy for customers to scan.' },
              { icon: CircleDollarSign, title: 'Grow your revenue', body: 'Clear calls to action help visitors move from discovery to inquiry faster.' },
              { icon: BadgeCheck, title: 'Build online reputation', body: 'Structured cards and detail pages support trust with focused, readable listing information.' },
            ].map((item) => (
              <div key={item.title} className="grid grid-cols-[64px_1fr] gap-4">
                <span className="flex h-16 w-16 items-center justify-center rounded-xl bg-white text-[#ffb52e] shadow-[0_18px_45px_rgba(18,21,111,0.10)] ring-1 ring-[#12156f12]"><item.icon className="h-7 w-7" /></span>
                <div>
                  <h3 className="text-lg font-black text-[#12156f]">{item.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-[#545b70]">{item.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="relative overflow-hidden rounded-xl bg-[#12156f] p-4">
          <div className="aspect-[4/3] overflow-hidden rounded-xl bg-[#e8ecf4]">
            <img src={posts[0] ? getEditablePostImage(posts[0]) : fallbackImages[0]} alt="" className="h-full w-full object-cover opacity-85" />
          </div>
          <div className="absolute bottom-8 left-8 right-8 rounded-xl bg-white p-5 shadow-xl">
            <p className="text-xs font-black uppercase tracking-[0.22em] text-[#ffb52e]">Directory pulse</p>
            <h3 className="mt-2 text-2xl font-black text-[#12156f]">{picks.length || posts.length}+ active provider highlights</h3>
            <Link href={route} className="mt-4 inline-flex items-center gap-2 rounded-xl bg-[#ffb52e] px-5 py-3 text-sm font-black text-[#111111]">Explore listings <ArrowRight className="h-4 w-4" /></Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export function EditableHomeCta() {
  return (
    <section className="bg-[#f3f0fa] py-16">
      <div className="mx-auto max-w-[1180px] px-4 text-center sm:px-6 lg:px-8">
        <p className="text-xs font-black uppercase tracking-[0.28em] text-[#ffb52e]">Get listed</p>
        <h2 className="mx-auto mt-3 max-w-2xl text-4xl font-black tracking-tight text-[#12156f]">{pagesContent.home.cta.title}</h2>
        <p className="mx-auto mt-4 max-w-2xl text-base leading-8 text-[#545b70]">{pagesContent.home.cta.description}</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href={pagesContent.home.cta.primaryCta.href} className={dc.button.accent}>{pagesContent.home.cta.primaryCta.label}</Link>
          <Link href={pagesContent.home.cta.secondaryCta.href} className={dc.button.secondary}>{pagesContent.home.cta.secondaryCta.label}</Link>
        </div>
      </div>
    </section>
  )
}
