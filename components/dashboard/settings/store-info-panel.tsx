"use client";

import { useState } from "react";
import { Store, Globe, MapPin, Clock } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { SegmentedControl } from "@/components/ui/segmented-control";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { StoreType } from "@/lib/data";

export function StoreInfoPanel() {
  const [storeType, setStoreType] = useState<StoreType>("online");

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Store className="size-4 text-primary" />
          هوية المتجر
        </CardTitle>
        <CardDescription>
          المعلومات الأساسية التي يعتمد عليها البوت في التعريف بمتجرك.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-5">
        <div className="grid gap-2">
          <Label htmlFor="store-name">اسم المتجر</Label>
          <Input id="store-name" defaultValue="متجري" placeholder="اسم متجرك" />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="store-desc">وصف المتجر</Label>
          <Textarea
            id="store-desc"
            rows={3}
            defaultValue="متجر إلكتروني متخصص في الإكسسوارات والأجهزة الذكية بأفضل الأسعار."
            placeholder="نبذة قصيرة يعرضها البوت عند التعريف بالمتجر"
          />
        </div>

        <div className="grid gap-2">
          <Label>نوع المتجر</Label>
          <SegmentedControl<StoreType>
            options={[
              { value: "online", label: "متجر إلكتروني", icon: <Globe className="size-4" /> },
              { value: "physical", label: "متجر فعلي", icon: <MapPin className="size-4" /> },
            ]}
            value={storeType}
            onChange={setStoreType}
          />
        </div>

        {/* Conditional: only physical stores expose branch details */}
        {storeType === "physical" && (
          <div className="grid gap-4 rounded-xl border border-dashed border-border bg-secondary/30 p-4 sm:grid-cols-2">
            <div className="grid gap-2">
              <Label htmlFor="branch-loc">
                <MapPin className="size-3.5 text-muted-foreground" />
                موقع الفرع
              </Label>
              <Input id="branch-loc" placeholder="مثال: الرياض — حي العليا" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="branch-hours">
                <Clock className="size-3.5 text-muted-foreground" />
                ساعات العمل
              </Label>
              <Input id="branch-hours" placeholder="مثال: ٩ ص – ١١ م" />
            </div>
          </div>
        )}

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="grid gap-2">
            <Label>العملة</Label>
            <Select defaultValue="sar">
              <SelectTrigger>
                <SelectValue placeholder="اختر العملة" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="sar">ريال سعودي (ر.س)</SelectItem>
                <SelectItem value="aed">درهم إماراتي (د.إ)</SelectItem>
                <SelectItem value="kwd">دينار كويتي (د.ك)</SelectItem>
                <SelectItem value="egp">جنيه مصري (ج.م)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-2">
            <Label>لهجة ولغة الرد</Label>
            <Select defaultValue="sa">
              <SelectTrigger>
                <SelectValue placeholder="اختر اللهجة" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="sa">عربي — لهجة سعودية</SelectItem>
                <SelectItem value="eg">عربي — لهجة مصرية</SelectItem>
                <SelectItem value="fsha">عربي فصحى</SelectItem>
                <SelectItem value="en">الإنجليزية</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
