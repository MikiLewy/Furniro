import Footer from '@components/organisms/footer';
import Navbar from '@components/organisms/navbar';

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Navbar />
      <main className="2xl:max-w-[1440px] mx-auto flex flex-col px-4 md:px-6 lg:px-8">
        {children}
        <Footer />
      </main>
    </div>
  );
}
