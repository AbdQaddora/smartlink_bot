"use client";

import { AlertTriangle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import type { Product } from "@/lib/data";

interface DeleteProductDialogProps {
  product: Product | null;
  onOpenChange: (open: boolean) => void;
  onConfirm?: (product: Product) => void;
}

export function DeleteProductDialog({
  product,
  onOpenChange,
  onConfirm,
}: DeleteProductDialogProps) {
  return (
    <Dialog open={Boolean(product)} onOpenChange={onOpenChange}>
      <DialogContent showClose={false} className="max-w-md text-center">
        <DialogHeader className="items-center text-center">
          <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-destructive/10 text-destructive">
            <AlertTriangle className="size-7" />
          </div>
          <DialogTitle className="mt-2 w-full text-center">
            حذف «{product?.name}»؟
          </DialogTitle>
          <DialogDescription className="w-full text-center">
            سيتم حذف المنتج نهائياً ولن يعود البوت قادراً على اقتراحه للزبائن.
            لا يمكن التراجع عن هذا الإجراء.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="sm:justify-center">
          <Button
            variant="destructive"
            className="flex-1"
            onClick={() => {
              if (product) onConfirm?.(product);
              onOpenChange(false);
            }}
          >
            نعم، احذف المنتج
          </Button>
          <Button
            variant="outline"
            className="flex-1"
            onClick={() => onOpenChange(false)}
          >
            إلغاء
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
