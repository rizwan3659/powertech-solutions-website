import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StickyButtons from "@/components/StickyButtons";
import PromoBanner from "@/components/PromoBanner";

export default function FrontendLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <PromoBanner />
      <Header />
      <main className="flex-grow">{children}</main>
      <Footer />
      <StickyButtons />
    </>
  );
}
