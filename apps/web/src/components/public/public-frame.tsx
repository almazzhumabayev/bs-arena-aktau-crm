import { SiteFooter } from './site-footer';
import { SiteHeader } from './site-header';

export function PublicFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#05070d]">
      <SiteHeader />
      <main>{children}</main>
      <SiteFooter />
    </div>
  );
}
