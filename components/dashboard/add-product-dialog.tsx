"use client";

import { useState } from "react";
import { UploadCloud, LinkIcon } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import type { Product } from "@/lib/data";

interface AddProductDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** When set, the dialog is in "edit" mode and pre-fills the fields. */
  product?: Product | null;
  onSubmit?: (values: ProductFormValues) => void;
}

export interface ProductFormValues {
  name: string;
  price: string;
  url: string;
  description: string;
}

export function AddProductDialog({
  open,
  onOpenChange,
  product,
  onSubmit,
}: AddProductDialogProps) {
  const isEdit = Boolean(product);
  const [values, setValues] = useState<ProductFormValues>({
    name: product?.name ?? "",
    price: product ? String(product.price) : "",
    url: product?.externalUrl ?? "",
    description: product?.specs ?? "",
  });

  const set = (key: keyof ProductFormValues) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setValues((v) => ({ ...v, [key]: e.target.value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit?.(values);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            {isEdit ? "تعديل المنتج" : "إضافة منتج جديد"}
          </DialogTitle>
          <DialogDescription>
            أدخل بيانات المنتج ليتعرّف عليه البوت ويقترحه على الزبائن.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="grid gap-5">
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="grid gap-2">
              <Label htmlFor="p-name">اسم المنتج</Label>
              <Input
                id="p-name"
                placeholder="مثال: سماعة لاسلكية Pro"
                value={values.name}
                onChange={set("name")}
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="p-price">السعر</Label>
              <div className="relative">
                <Input
                  id="p-price"
                  type="number"
                  inputMode="numeric"
                  placeholder="0"
                  className="pl-14"
                  value={values.price}
                  onChange={set("price")}
                  required
                />
                <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                  ر.س
                </span>
              </div>
            </div>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="p-url">
              <LinkIcon className="size-3.5 text-muted-foreground" />
              رابط المنتج في المتجر (اختياري)
            </Label>
            <Input
              id="p-url"
              type="url"
              dir="ltr"
              placeholder="https://store.example.com/product"
              value={values.url}
              onChange={set("url")}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="p-desc">الوصف والمواصفات</Label>
            <Textarea
              id="p-desc"
              rows={3}
              placeholder="اكتب أهم مواصفات المنتج التي تهم الزبون..."
              value={values.description}
              onChange={set("description")}
            />
          </div>

          {/* Drag & drop upload zone */}
          <div className="grid gap-2">
            <Label>صورة المنتج</Label>
            <label
              htmlFor="p-image"
              className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-border bg-secondary/40 px-4 py-8 text-center transition-colors hover:border-primary/50 hover:bg-accent/40"
            >
              <div className="flex size-11 items-center justify-center rounded-full bg-primary/10 text-primary">
                <UploadCloud className="size-5" />
              </div>
              <p className="text-sm font-medium">
                اسحب الصورة هنا أو اضغط للاختيار
              </p>
              <p className="text-xs text-muted-foreground">
                PNG أو JPG · بحد أقصى 5 ميجابايت
              </p>
              <input id="p-image" type="file" accept="image/*" className="sr-only" />
            </label>
          </div>

          <DialogFooter>
            <Button type="submit">
              {isEdit ? "حفظ التعديلات" : "إضافة المنتج"}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              إلغاء
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
