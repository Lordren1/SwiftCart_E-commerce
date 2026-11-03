"use client";

import { useParams } from "next/navigation";
import AddProduct from "../../page";

export default function EditProductPage() {
  const params = useParams();

  return <AddProduct mode="edit" productId={params.id} />;
}
