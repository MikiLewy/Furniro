import Footer from '@components/organisms/footer';
import Navbar from '@components/organisms/navbar';

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-full flex flex-col relative">
      <Navbar />
      <main className="max-w-[1680px] flex flex-col items-start px-4 md:px-6 lg:px-8 mx-auto w-full h-full">
        <div className="w-full">{children}</div>
        <Footer />
      </main>
    </div>
  );
}
