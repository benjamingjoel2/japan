export default function Home() {
  return (
    <div id="top">
      <section className="flex h-[200vh] items-center justify-center bg-night text-washi">
        <h1 className="font-display text-hero uppercase">Komo rebi</h1>
      </section>
      {['komorebi', 'values', 'stay', 'journeys', 'a-night', 'manners', 'team', 'words', 'faq'].map((id) => (
        <section key={id} id={id} className="py-section px-gutter">
          <h2 className="text-h2">{id}</h2>
        </section>
      ))}
    </div>
  );
}
