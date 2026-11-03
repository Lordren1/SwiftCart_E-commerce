import { Suspense } from "react";
import AllCollections from "../components/collections/AllCollections";

export default function AllCollectionsPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen pt-32 text-center text-slate-400">
          Loading collections...
        </main>
      }
    >
      <AllCollections />
    </Suspense>
  );
}
