import { SiteHeader } from '@/components/navbar/site-header';

export default async function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <main className="flex flex-1 flex-col">
      <SiteHeader />
      {children}
    </main>
  );
}