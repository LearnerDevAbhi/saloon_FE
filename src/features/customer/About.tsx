const journeyImages = [
  'https://images.unsplash.com/photo-1504593811423-6dd665756598?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1508979827776-cdbd178a01cf?auto=format&fit=crop&w=800&q=80',
];

const values = [
  {
    title: 'Craftsmanship',
    copy: 'Our stylists and therapists continually train in modern and classic techniques to deliver bespoke looks.',
  },
  {
    title: 'Wellness',
    copy: 'Mindful rituals, aromatherapy, and clean products so every visit feels restorative.',
  },
  {
    title: 'Community',
    copy: 'Inclusive experiences with memberships, late hours, and pop-up events for our guests.',
  },
];

const About = () => {
  return (
    <section className="space-y-16">
      <div
        className="rounded-[32px] bg-black px-10 py-14 text-white shadow-card"
        style={{
          backgroundImage:
            "linear-gradient(135deg, rgba(0,0,0,0.85), rgba(0,0,0,0.75)), url('https://images.unsplash.com/photo-1519744346361-1de5fd04c08c?auto=format&fit=crop&w=1600&q=80')",
          backgroundSize: 'cover',
        }}
      >
        <p className="text-sm uppercase tracking-[0.5em] text-white/70">About us</p>
        <h1 className="font-display mt-4 text-4xl/tight">Sophisticated hair and spa culture for the modern city.</h1>
        <p className="mt-4 max-w-2xl text-lg text-white/80">
          Since 2010, SalonFlow has paired couture techniques with mindful wellness. From precision cuts to immersive spa
          treatments, every detail is designed to feel editorial yet effortless.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {journeyImages.map((src) => (
          <div key={src} className="overflow-hidden rounded-3xl shadow-card">
            <img src={src} alt="Studio vignette" className="h-full w-full object-cover" />
          </div>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {values.map((value) => (
          <article key={value.title} className="rounded-3xl border border-slate-200/60 bg-white p-6 shadow-card">
            <p className="text-xs uppercase tracking-[0.3em] text-slate-400">{value.title}</p>
            <p className="mt-3 text-slate-600">{value.copy}</p>
          </article>
        ))}
      </div>

      <div className="grid gap-10 rounded-[32px] bg-slate-900 px-10 py-12 text-white shadow-card md:grid-cols-2">
        <div>
          <p className="text-sm uppercase tracking-[0.4em] text-white/60">Experience</p>
          <h2 className="mt-3 text-3xl font-semibold">What makes a SalonFlow visit different?</h2>
          <p className="mt-4 text-white/80">
            A curated beverage bar, on-demand beauty concierge, semi-private suites, and a digital booking journey that
            mirrors luxury hospitality.
          </p>
        </div>
        <ul className="space-y-4 text-sm text-white/80">
          <li className="flex items-start gap-3">
            <span className="text-primary-200">—</span> Complimentary style coaching & after-care guides.
          </li>
          <li className="flex items-start gap-3">
            <span className="text-primary-200">—</span> Smart waitlist with SMS / WhatsApp updates.
          </li>
          <li className="flex items-start gap-3">
            <span className="text-primary-200">—</span> Members-only late nights with live DJ sets.
          </li>
          <li className="flex items-start gap-3">
            <span className="text-primary-200">—</span> Conscious product edit featuring Oribe, Aesop, and Dyson tech.
          </li>
        </ul>
      </div>
    </section>
  );
};

export default About;

