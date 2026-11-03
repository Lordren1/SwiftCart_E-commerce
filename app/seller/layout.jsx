import Sidebar from "../components/seller/Sidebar";

export default function SellerLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />
      <main className="min-w-0 flex-1">{children}</main>
    </div>
  );
}
