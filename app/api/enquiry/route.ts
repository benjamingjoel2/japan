import { NextResponse } from 'next/server';
import { enquirySchema } from '@/lib/enquiry';

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid request' }, { status: 400 });
  }
  const parsed = enquirySchema.safeParse(body);
  if (!parsed.success) {
    const fields = Object.fromEntries(parsed.error.issues.map((i) => [i.path.join('.'), i.message]));
    return NextResponse.json({ ok: false, error: 'Please check the highlighted fields', fields }, { status: 422 });
  }
  // Honeypot filled in: pretend all is well, keep nothing.
  if (parsed.data.website) return NextResponse.json({ ok: true });
  const { website: _hp, ...data } = parsed.data;
  void _hp;
  const enquiry = { ...data, receivedAt: new Date().toISOString() };

  // TODO: CRM integration. Send `enquiry` to the CRM (e.g. HubSpot / Pipedrive / Airtable) and
  // notify the specialist on call. Until then the payload is only logged.
  console.log('[enquiry]', JSON.stringify(enquiry));

  return NextResponse.json({ ok: true });
}
