import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StickyButtons from "@/components/StickyButtons";
import PromoBanner from "@/components/PromoBanner";
import TopBar from "@/components/TopBar";

export default function FrontendLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <TopBar />
      <PromoBanner />
      <Header />
      <main className="flex-grow">{children}</main>
      <Footer />
      <StickyButtons />
    </>
  );
}
