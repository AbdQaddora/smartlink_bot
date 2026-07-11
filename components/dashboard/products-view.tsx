"use client";

import { useState } from "react";
import Image from "next/image";
import { Plus, LayoutGrid, Rows3, ExternalLink, Pencil, Trash2 } from "lucide-react";
import { PageHeading } from "@/components/dashboard/page-heading";
import { ProductCard } from "@/components/dashboard/product-card";
import { AddProductDialog } from "@/components/dashboard/add-product-dialog";
import { DeleteProductDialog } from "@/components/dashboard/delete-product-dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { PRODUCTS, type Product } from "@/lib/data";

type ViewMode = "grid" | "table";

export function ProductsView() {
  const [view, setView] = useState<ViewMode>("grid");
  const [addOpen, setAddOpen] = useState(false);
  const [editing, setEditing] = useState<Product | null>(null);
  const [deleting, setDeleting] = useState<Product | null>(null);

  const openAdd = () => {
    setEditing(null);
    setAddOpen(true);
  };
  const openEdit = (product: Product) => {
    setEditing(product);
    setAddOpen(true);
  };

  return (
    <div className="space-y-6">
      <PageHeading
        title="المنتجات"
        subtitle={`${PRODUCTS.length} منتج متاح للبوت`}
        action={
          <div className="flex items-center gap-3">
            {/* Grid / table switch */}
            <div className="inline-flex items-center gap-1 rounded-xl bg-secondary p-1">
              <button
                type="button"
                aria-label="عرض شبكي"
                onClick={() => setView("grid")}
                className={cn(
                  "flex size-8 items-center justify-center rounded-lg transition-colors",
                  view === "grid"
                    ? "bg-card text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                <LayoutGrid className="size-4" />
              </button>
              <button
                type="button"
                aria-label="عرض جدولي"
                onClick={() => setView("table")}
                className={cn(
                  "flex size-8 items-center justify-center rounded-lg transition-colors",
                  view === "table"
                    ? "bg-card text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                <Rows3 className="size-4" />
              </button>
            </div>

            <Button onClick={openAdd}>
              <Plus className="size-4" />
              إضافة منتج جديد
            </Button>
          </div>
        }
      />

      {view === "grid" ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {PRODUCTS.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onEdit={openEdit}
              onDelete={setDeleting}
            />
          ))}
        </div>
      ) : (
        <Card className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>المنتج</TableHead>
                <TableHead>السعر</TableHead>
                <TableHead className="hidden md:table-cell">المواصفات</TableHead>
                <TableHead>الحالة</TableHead>
                <TableHead>الرابط</TableHead>
                <TableHead className="text-left">إجراءات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {PRODUCTS.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="relative size-11 shrink-0 overflow-hidden rounded-lg bg-secondary">
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          sizes="44px"
                          className="object-cover"
                        />
                      </div>
                      <span className="font-medium">{product.name}</span>
                    </div>
                  </TableCell>
                  <TableCell className="font-semibold text-primary whitespace-nowrap">
                    {product.price} {product.currency}
                  </TableCell>
                  <TableCell className="hidden max-w-xs md:table-cell">
                    <span className="line-clamp-1 text-xs text-muted-foreground">
                      {product.specs}
                    </span>
                  </TableCell>
                  <TableCell>
                    {product.inStock ? (
                      <Badge variant="success">متوفر</Badge>
                    ) : (
                      <Badge variant="destructive">نفد</Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    {product.externalUrl ? (
                      <a
                        href={product.externalUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline"
                      >
                        <ExternalLink className="size-3.5" />
                        رابط خارجي
                      </a>
                    ) : (
                      <span className="text-xs text-muted-foreground">—</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center justify-start gap-1">
                      <Button
                        variant="ghost"
                        size="icon-sm"
                        aria-label="تعديل"
                        onClick={() => openEdit(product)}
                      >
                        <Pencil className="size-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon-sm"
                        aria-label="حذف"
                        className="text-destructive hover:bg-destructive/5"
                        onClick={() => setDeleting(product)}
                      >
                        <Trash2 className="size-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      )}

      {/* Dialogs. key remounts the form so fields reset per product. */}
      <AddProductDialog
        key={editing?.id ?? "new"}
        open={addOpen}
        onOpenChange={setAddOpen}
        product={editing}
      />
      <DeleteProductDialog
        product={deleting}
        onOpenChange={(open) => !open && setDeleting(null)}
      />
    </div>
  );
}
