export default function CheckoutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="max-w-[1680px] mx-auto h-full w-full ">{children}</main>
  );
}
