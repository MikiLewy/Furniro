import Footer from '@/components/organisms/footer';
import Navbar from '@components/organisms/navbar';

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col relative h-full">
      <Navbar />
      <main className="max-w-[1680px] min-h-full flex flex-col gap-2 items-start px-4 md:px-6 lg:px-8 mx-auto w-full ">
        <div className="w-full min-h-full">{children}</div>
        <Footer />
      </main>
    </div>
  );
}
