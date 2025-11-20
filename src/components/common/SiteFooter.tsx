const footerLinks = [
  { label: 'Services', href: '/services' },
  { label: 'Team', href: '/team' },
  { label: 'Book', href: '/bookings/new' },
];

const socialLinks = [
  { label: 'Instagram', href: 'https://instagram.com' },
  { label: 'Facebook', href: 'https://facebook.com' },
  { label: 'Twitter', href: 'https://twitter.com' },
];

const SiteFooter = () => (
  <footer className="border-t border-slate-200 bg-black text-white">
    <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-8">
      <p className="text-sm text-white/70">
        © {new Date().getFullYear()} SalonFlow • Modern monochrome beauty house.
      </p>
      <div className="flex flex-wrap gap-6 text-sm text-white/70">
        {footerLinks.map((link) => (
          <a key={link.label} href={link.href} className="hover:text-white">
            {link.label}
          </a>
        ))}
      </div>
      <div className="flex gap-4 text-sm text-white/70">
        {socialLinks.map((link) => (
          <a key={link.label} href={link.href} target="_blank" rel="noreferrer" className="hover:text-white">
            {link.label}
          </a>
        ))}
      </div>
    </div>
  </footer>
);

export default SiteFooter;

