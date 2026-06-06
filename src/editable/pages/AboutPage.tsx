import { SITE_CONFIG } from '@/lib/site-config'
import { pagesContent } from '@/editable/content/pages.content'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'

export default function AboutPage() {
  return (
    <EditableSiteShell>
      <main className="bg-[#f7f8fc] px-4 py-14 text-[#12156f] sm:px-6 lg:px-8">
        <section className="mx-auto grid max-w-[1180px] gap-8 lg:grid-cols-[1.08fr_0.92fr]">
          <article className="rounded-xl border border-[#12156f22] bg-white p-8 shadow-sm lg:p-12">
            <p className="text-xs font-black uppercase tracking-[0.24em] text-[#ffb52e]">{pagesContent.about.badge}</p>
            <h1 className="mt-5 text-5xl font-black tracking-tight">About {SITE_CONFIG.name}</h1>
            <p className="mt-5 max-w-2xl text-base leading-8 text-[#545b70]">{pagesContent.about.description}</p>
            <div className="mt-8 space-y-4 text-sm leading-8 text-[#545b70]">
              {pagesContent.about.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </div>
          </article>
          <aside className="space-y-4">
            {pagesContent.about.values.map((value) => (
              <div key={value.title} className="rounded-xl border border-[#12156f22] bg-white p-6 shadow-sm">
                <h2 className="text-xl font-black tracking-tight">{value.title}</h2>
                <p className="mt-3 text-sm leading-7 text-[#545b70]">{value.description}</p>
              </div>
            ))}
          </aside>
        </section>
      </main>
    </EditableSiteShell>
  )
}
