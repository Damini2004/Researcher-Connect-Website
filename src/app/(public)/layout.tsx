import Footer from "@/components/layout/footer";
import UserHeader from "@/components/layout/user-header";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <UserHeader />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
