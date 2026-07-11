import Image from "next/image";
import { ExternalLink, Pencil, Trash2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { Product } from "@/lib/data";

interface ProductCardProps {
  product: Product;
  onEdit?: (product: Product) => void;
  onDelete?: (product: Product) => void;
}

export function ProductCard({ product, onEdit, onDelete }: ProductCardProps) {
  return (
    <Card className="group gap-0 overflow-hidden p-0 transition-[transform,box-shadow] duration-200 hover:-translate-y-1 hover:shadow-md">
      <div className="relative aspect-[4/3] overflow-hidden bg-secondary">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 100vw, 300px"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute top-3 right-3 flex gap-1.5">
          {product.externalUrl && (
            <span
              title="مرتبط بمتجر خارجي"
              className="flex size-7 items-center justify-center rounded-full bg-card/90 text-primary shadow-sm backdrop-blur"
            >
              <ExternalLink className="size-3.5" />
            </span>
          )}
        </div>
        <div className="absolute bottom-3 right-3">
          {product.inStock ? (
            <Badge variant="success">متوفر</Badge>
          ) : (
            <Badge variant="destructive">نفد المخزون</Badge>
          )}
        </div>
      </div>

      <div className="flex flex-1 flex-col p-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold leading-tight">{product.name}</h3>
          <p className="shrink-0 font-bold text-primary">
            {product.price} <span className="text-xs">{product.currency}</span>
          </p>
        </div>
        <p className="mt-2 line-clamp-2 flex-1 text-xs leading-relaxed text-muted-foreground">
          {product.specs}
        </p>

        <div className="mt-4 flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="flex-1"
            onClick={() => onEdit?.(product)}
          >
            <Pencil className="size-3.5" />
            تعديل
          </Button>
          <Button
            variant="outline"
            size="icon-sm"
            aria-label="حذف المنتج"
            className="text-destructive hover:border-destructive/40 hover:bg-destructive/5"
            onClick={() => onDelete?.(product)}
          >
            <Trash2 className="size-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
}
