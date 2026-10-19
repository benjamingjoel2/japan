import { site } from '@/config/site';
import { pageMeta } from '@/lib/seo';
import { PageHeader } from '@/components/ui/PageHeader';

export const metadata = pageMeta({ title: 'Legal', description: 'Booking terms, privacy, cookies and licence details for Komorebi.', path: '/legal' });

// PLACEHOLDER legal copy. Replace with text reviewed by a lawyer before launch.
const sections = [
  {
    id: 'terms',
    title: 'Booking terms',
    body: [
      'These are placeholder terms. Final booking conditions, including deposits, balance due dates, cancellation charges and changes, will be published here before launch and confirmed in writing with every booking.',
      'Placeholder: a deposit of [X]% secures a journey; the balance is due [X] days before travel. Cancellation charges rise as the travel date approaches. We strongly recommend travel insurance from the moment you book.',
    ],
  },
  {
    id: 'privacy',
    title: 'Privacy',
    body: [
      'We collect the details you give us in the planning form (name, contact details, travel preferences and anything you add in your notes) so that we can reply and plan your journey. We do not sell your data.',
      'Placeholder: data controller, retention periods, processors (e.g. CRM and email providers), international transfers and how to exercise your rights will be listed here before launch.',
    ],
  },
  {
    id: 'cookies',
    title: 'Cookies',
    body: [
      'This site uses no advertising or tracking cookies. Your currency choice is remembered in your browser’s local storage. If we add analytics later, we will update this notice and ask for consent where required.',
    ],
  },
  {
    id: 'licence',
    title: 'Licence & registration',
    body: [`${site.company.legalName}. ${site.company.registration}.`, `${site.company.partner}.`, ...site.company.address],
  },
];

export default function LegalPage() {
  return (
    <>
      <PageHeader label="Legal" title="The small print" lead="Placeholder copy. To be replaced with reviewed terms before launch." />
      <div className="grid gap-10 px-gutter pb-section lg:grid-cols-[14rem_1fr]">
        <nav aria-label="Legal sections" className="lg:sticky lg:top-[calc(var(--header-h)+1rem)] lg:self-start">
          <ul className="flex flex-wrap gap-3 text-[14px] lg:flex-col lg:gap-1.5">
            {sections.map((s) => (
              <li key={s.id}>
                <a href={`#${s.id}`} className="underline-offset-4 hover:underline">
                  {s.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="prose-k">
          {sections.map((s) => (
            <section key={s.id} id={s.id} className="scroll-mt-[calc(var(--header-h)+1rem)]">
              <h2>{s.title}</h2>
              {s.body.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </section>
          ))}
        </div>
      </div>
    </>
  );
}
