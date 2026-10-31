// Legal pages. Plain English source text; translated per locale like the rest of /data.
// {brand}, {email} and {address} are filled in when the page renders.

export type LegalSection = { title: string; body: string[] };
export type LegalDoc = { slug: 'privacy' | 'booking-terms' | 'cookies'; title: string; label: string; lead: string; description: string; sections: LegalSection[] };

export const legalUpdated = '2026-10-30';

export const legalDocs: LegalDoc[] = [
  {
    slug: 'privacy',
    label: 'Privacy Policy',
    title: 'Privacy Policy',
    lead: 'How we collect, use and protect the personal information you share with us.',
    description: 'How {brand} collects, uses and protects your personal information when you enquire about or travel on a journey in Japan.',
    sections: [
      {
        title: 'Who we are',
        body: [
          '{brand} plans private, tailor-made journeys in Japan. We are the controller of the personal information described in this policy. You can reach us at {email} or by post at {address}.',
        ],
      },
      {
        title: 'What we collect',
        body: [
          'When you use our planning form or write to us, we collect the details you choose to give: your name, email address, phone number if you add one, when and for how long you would like to travel, who is travelling, your interests, budget range and anything you write in your notes.',
          'If you go on to book, we also collect what is needed to arrange your journey, such as passport names, dates of birth, flight details, dietary needs, accessibility or health information you choose to share, and emergency contact details.',
          'Our website does not use advertising or analytics cookies. Our hosting provider keeps standard technical logs (such as IP address, browser type and the pages requested) for security and to keep the site running.',
        ],
      },
      {
        title: 'How we use it',
        body: [
          'We use your information to reply to your enquiry, prepare proposals and quotes, book and manage your journey, look after you while you travel, and keep the records we are required to keep.',
          'We rely on your request and our contract with you to do this, on our legitimate interest in running and improving our service, on legal obligations, and on your explicit consent for any health or accessibility information you share so that we can look after you properly.',
          'We do not sell your personal information, and we will only send you news from us if you have asked for it. You can stop at any time.',
        ],
      },
      {
        title: 'Who we share it with',
        body: [
          'We share only what is needed to arrange your journey with the people who provide it, such as inns, hotels, guides, drivers, transport companies and activity partners in Japan, and with service providers who help us run our business, such as email, hosting and secure storage providers.',
          'Some of these partners are outside your home country, including in Japan. Where the law requires it, we make sure your information is protected by appropriate safeguards, such as standard contractual clauses.',
          'We may also disclose information where the law requires us to, or to protect the safety of a traveller.',
        ],
      },
      {
        title: 'How long we keep it',
        body: [
          'If you enquire but do not travel with us, we keep your enquiry for up to two years so that we can pick up the conversation again, then delete it. If you travel with us, we keep booking records for as long as accounting, tax and legal requirements oblige us to, usually up to seven years after your journey.',
        ],
      },
      {
        title: 'Your rights',
        body: [
          'Depending on where you live, you may have the right to access the information we hold about you, to have it corrected or deleted, to restrict or object to how we use it, to receive a copy in a portable format, and to withdraw consent at any time.',
          'To use any of these rights, write to {email}. We will reply within one month. If you are not satisfied with our answer, you can complain to the data protection authority where you live.',
        ],
      },
      {
        title: 'Security',
        body: [
          'We use reputable providers, encrypted connections and limited access to keep your information safe. No method of transmission over the internet is completely secure, so please do not send card details or passport scans by ordinary email unless we ask you to use a secure method.',
        ],
      },
      {
        title: 'Changes to this policy',
        body: ['We may update this policy from time to time. The date at the top of the page shows when it last changed.'],
      },
    ],
  },
  {
    slug: 'booking-terms',
    label: 'Booking Terms',
    title: 'Booking Terms',
    lead: 'The terms on which we plan and arrange your journey. Please read them before you confirm a booking.',
    description: 'The booking terms and conditions for private, tailor-made journeys in Japan planned by {brand}.',
    sections: [
      {
        title: 'About these terms',
        body: [
          'These terms apply to every journey arranged by {brand} ({address}). In these terms, “we” and “us” mean {brand}, and “you” means everyone named on the booking. The person who makes the booking confirms that they are authorised to accept these terms on behalf of everyone travelling.',
        ],
      },
      {
        title: 'Enquiries and proposals',
        body: [
          'Every journey we arrange is tailor-made. When you send an enquiry, we reply with ideas and then a written proposal. Enquiries and proposals are free and place you under no obligation.',
          'Proposals are based on availability and prices at the time we prepare them. Nothing is held for you until you confirm your booking and we confirm it back to you in writing.',
        ],
      },
      {
        title: 'Quotes and prices',
        body: [
          'Prices shown on this website are “from” prices per person sharing, given as a guide only. Your quote sets out exactly what is included and what is not, and the price you pay is the one in your written confirmation.',
          'International flights, travel insurance, visas, personal expenses and anything not listed as included in your quote are not included unless we say otherwise in writing.',
        ],
      },
      {
        title: 'Booking, deposit and balance',
        body: [
          'Your booking is confirmed when you accept your quote, pay the deposit stated in it, and we send you written confirmation. A contract between you and us exists from that moment.',
          'The balance is due by the date stated in your quote, which is usually some weeks before you travel. If you book close to your travel date, the full price may be due at the time of booking. If the balance is not paid on time, we may treat the booking as cancelled by you and apply the cancellation charges below.',
        ],
      },
      {
        title: 'If you change your booking',
        body: [
          'If you would like to change your journey after it is confirmed, tell us in writing as soon as possible. We will do our best to help, but cannot guarantee that every change can be made. You will be asked to pay any extra costs charged by our partners, and a reasonable fee for the work involved, which we will tell you before you decide.',
        ],
      },
      {
        title: 'If you cancel',
        body: [
          'You may cancel your booking at any time by writing to us. Because inns, guides and services are reserved in your name, cancellation charges apply, and they increase as your departure date gets closer. The charges for your journey are set out in your quote and confirmation. They will never be more than the total price of your journey.',
          'If you have to cancel, your travel insurance may cover some or all of the charges, which is one of the reasons we ask you to take out insurance as soon as you book.',
        ],
      },
      {
        title: 'If we change or cancel your journey',
        body: [
          'We plan carefully, but occasionally we have to make changes. Minor changes, such as replacing an inn with another of a similar standard, may be made without compensation. If we have to make a significant change, we will tell you as soon as possible and offer you the choice of accepting the change, taking an alternative journey, or cancelling with a full refund of the money you have paid us.',
          'We will not cancel your journey after the balance is paid except for reasons beyond our control or if you have not paid what is due. If we do cancel, we will refund everything you have paid us.',
        ],
      },
      {
        title: 'Events beyond our control',
        body: [
          'We are not responsible for changes, delays or cancellations caused by events beyond our reasonable control, such as extreme weather, natural disasters, epidemics, government action, industrial action or serious transport disruption. If such an event affects your journey, we will help you make alternative arrangements and refund any amounts we are able to recover from our partners.',
        ],
      },
      {
        title: 'Travel insurance',
        body: [
          'Comprehensive travel insurance is a condition of booking. It should cover cancellation, medical treatment and repatriation, and any activities in your journey, such as walking or cycling. Please take it out as soon as you confirm your booking and send us the policy details before you travel.',
        ],
      },
      {
        title: 'Passports, visas and health',
        body: [
          'You are responsible for making sure that you have a valid passport, any visa or entry authorisation required for Japan and any country you pass through, and that you meet any health requirements. We are happy to point you to official sources, but requirements change and the latest official guidance always applies.',
          'Please tell us before you book about any medical condition, mobility needs or dietary requirements that might affect your journey, so that we can plan around them.',
        ],
      },
      {
        title: 'Your responsibilities while travelling',
        body: [
          'We ask you to follow local laws and customs, respect the instructions of guides and hosts, and take care of your own belongings. We may end the journey of anyone whose behaviour puts others at risk or causes serious disruption, without refund.',
        ],
      },
      {
        title: 'Our responsibility to you',
        body: [
          'We will arrange your journey with reasonable skill and care, and we are responsible for making sure the services we confirm are provided. We are not liable for any loss or damage caused by you or anyone on your booking, by a third party not connected with the services we arranged, or by events beyond our control.',
          'Where our liability is limited by international conventions that apply to air, rail, road or sea travel and accommodation, our liability is limited in the same way. Otherwise, our liability for any claim other than for death or personal injury is limited to the total price of your journey. Nothing in these terms limits any rights you have under the law that cannot be excluded.',
        ],
      },
      {
        title: 'Complaints',
        body: [
          'If something is not right during your journey, please tell your guide, your host or us straight away so that we can try to put it right on the spot. If you are still not satisfied, write to us at {email} within 28 days of your return and we will look into it and reply as quickly as we can.',
        ],
      },
      {
        title: 'Governing law',
        body: [
          'These terms and any contract between us are governed by the law that applies to our business, without affecting any mandatory consumer protection rights you have where you live. Any dispute will be dealt with by the competent courts.',
        ],
      },
    ],
  },
  {
    slug: 'cookies',
    label: 'Cookie Policy',
    title: 'Cookie Policy',
    lead: 'What our website stores on your device, and how to remove it.',
    description: 'Which cookies and similar storage the {brand} website uses, and how to control them.',
    sections: [
      {
        title: 'Our approach',
        body: [
          'We keep this website as light as possible. It does not use advertising cookies, analytics cookies or any other tracking technology, and it does not load social media widgets.',
        ],
      },
      {
        title: 'What we store',
        body: [
          'The website sets no cookies. It uses one item of local storage in your browser, which is only created if you choose a currency for our prices:',
          'komorebi:currency: remembers the currency you chose for prices (yen, US dollars, pounds, euros or Australian dollars). It stays in your browser until you clear it, and it is never sent to us.',
          'Our hosting provider may use strictly necessary technical measures to deliver the site securely and protect it from abuse. These do not track you across other websites.',
        ],
      },
      {
        title: 'Consent',
        body: [
          'Because we only store what is strictly necessary for a feature you ask for, we do not need to ask for your consent. If we ever add analytics or other optional cookies, we will ask for your consent first and update this policy.',
        ],
      },
      {
        title: 'How to remove it or opt out',
        body: [
          'You can delete the stored currency choice at any time by clearing your browser’s site data for this website, or by browsing in a private window, where nothing is kept after you close it. Prices will then show in yen until you choose another currency.',
          'If you have any questions, write to {email}.',
        ],
      },
    ],
  },
];
