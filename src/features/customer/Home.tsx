import { ButtonLink } from '../../components/common/Button';

const signatureShots = [
  {
    title: 'Refined Hair Atelier',
    image: 'https://images.unsplash.com/photo-1503951458645-643d53bfd90f?auto=format&fit=crop&w=1000&q=80',
  },
  {
    title: 'Monochrome Manicure Studio',
    image: 'https://images.unsplash.com/photo-1505739775417-85f59b3e5c84?auto=format&fit=crop&w=1000&q=80',
  },
  {
    title: 'Immersive Spa Lounge',
    image: 'https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?auto=format&fit=crop&w=1000&q=80',
  },
];

const Home = () => (
  <section className="space-y-16">
    <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
      <div className="rounded-[32px] border border-slate-200/80 bg-white p-10 shadow-card">
        <p className="text-sm uppercase tracking-[0.5em] text-slate-400">SalonFlow</p>
        <h1 className="font-display mt-4 text-5xl text-slate-900">
          Black & white beauty rituals, curated for the city.
        </h1>
        <p className="mt-4 text-lg text-slate-600">
          Digital-first booking, couture finishing, and immersive spa treatments under one roof. Minimal palette,
          maximum detail.
        </p>
        <div className="mt-6 flex flex-wrap gap-4">
          <ButtonLink to="/bookings/new">Book an appointment</ButtonLink>
          <ButtonLink variant="ghost" to="/about">
            Discover our story
          </ButtonLink>
        </div>
      </div>
      <div className="overflow-hidden rounded-[32px] shadow-card">
        <img
          src="https://images.unsplash.com/photo-1441981974669-8f9bc0978bdf?auto=format&fit=crop&w=1400&q=80"
          alt="Salon interior"
          className="h-full w-full object-cover"
        />
      </div>
    </div>

    <div className="grid gap-6 md:grid-cols-3">
      {signatureShots.map((item) => (
        <article
          key={item.title}
          className="group overflow-hidden rounded-3xl border border-slate-200/70 bg-white shadow-card"
        >
          <div className="h-56 overflow-hidden">
            <img
              src={item.image}
              alt={item.title}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
          <div className="p-6">
            <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Signature</p>
            <h3 className="mt-2 text-xl font-semibold text-slate-900">{item.title}</h3>
            <p className="mt-2 text-sm text-slate-500">
              Private suites, Dyson styling tools, and editorial lighting for the perfect finish.
            </p>
          </div>
        </article>
      ))}
    </div>

    <div className="rounded-[32px] bg-slate-900 px-10 py-12 text-white shadow-card">
      <div className="grid gap-8 md:grid-cols-2">
        <div>
          <p className="text-sm uppercase tracking-[0.4em] text-white/50">Memberships</p>
          <h2 className="mt-3 text-3xl font-semibold">Monochrome Society</h2>
          <p className="mt-3 text-white/80">
            A tiered membership program with quarterly hair plans, on-demand express services, and exclusive gallery
            nights.
          </p>
        </div>
        <ul className="space-y-3 text-sm text-white/80">
          <li>— Priority booking + waitlist jump</li>
          <li>— Complimentary scalp reset each quarter</li>
          <li>— 15-minute glam add-ons for events</li>
          <li>— Access to collab drops with fashion houses</li>
        </ul>
      </div>
    </div>
  </section>
);

export default Home;

