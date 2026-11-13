import type { Metadata } from "next";
import { products } from "@/lib/data/products";
import { ProductTemplate } from "@/components/pages/ProductTemplate";

const page = products["payments"];

export const metadata: Metadata = { title: page.eyebrow, description: page.intro };

export default function Page() {
  return <ProductTemplate page={page} />;
}
