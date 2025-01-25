import Footer from '@/components/organisms/footer';

export default function CheckoutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col relative h-full">
      <main className="max-w-[1680px] min-h-full flex flex-col gap-4 lg:gap-10 items-start px-4 md:px-6 lg:px-8 mx-auto w-full py-4 lg:py-10">
        <div className="w-full min-h-full">{children}</div>
        <Footer />
      </main>
    </div>
  );
}
