import type { Service } from '@/lib/types';

export function ServiceCard({ service }: { service: Service }) {
  return (
    <article className="group overflow-hidden rounded-lg border border-white/10 bg-[#08111f] text-white shadow-panel">
      <div className="relative h-56 overflow-hidden">
        {service.imageUrl ? (
          <img src={service.imageUrl} alt="" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
        ) : (
          <div className="h-full bg-neutral-800" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#05070d] via-[#05070d]/25 to-transparent" />
        {service.priceLabel ? (
          <span className="absolute left-4 top-4 rounded-md bg-arena-amber px-3 py-1 text-xs font-semibold text-[#05070d]">{service.priceLabel}</span>
        ) : null}
      </div>
      <div className="p-5">
        <h2 className="text-2xl font-semibold">{service.title}</h2>
        <p className="mt-3 text-sm leading-6 text-neutral-300">{service.description}</p>
        <div className="mt-4 flex flex-wrap gap-2 text-sm">
          {service.durationMinutes ? <span className="rounded-md border border-white/15 px-3 py-1 text-neutral-200">{service.durationMinutes} мин</span> : null}
          <span className="rounded-md border border-arena-amber/40 px-3 py-1 text-arena-amber">BS ARENA</span>
        </div>
      </div>
    </article>
  );
}
