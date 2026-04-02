"use client";

import { useCallback, useRef, useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
  label?: string;
}

export function ImageUpload({
  value,
  onChange,
  label = "Featured Image",
}: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const uploadFile = useCallback(
    async (file: File) => {
      setUploading(true);
      try {
        const formData = new FormData();
        formData.append("file", file);

        const res = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        if (!res.ok) {
          const data = await res.json();
          alert(`Upload failed: ${data.error}`);
          return;
        }

        const { url } = await res.json();
        onChange(url);
      } finally {
        setUploading(false);
      }
    },
    [onChange]
  );

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) uploadFile(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith("image/")) {
      uploadFile(file);
    }
  };

  return (
    <div className="grid gap-2">
      <Label>{label}</Label>
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        className={`border-2 border-dashed rounded-lg p-4 text-center transition-colors ${
          dragOver
            ? "border-primary bg-primary/5"
            : "border-muted-foreground/25"
        }`}
      >
        {value ? (
          <div className="space-y-3">
            <img
              src={value}
              alt="Preview"
              className="max-h-48 mx-auto rounded-md object-cover"
            />
            <div className="flex gap-2 justify-center">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => fileInputRef.current?.click()}
                disabled={uploading}
              >
                Replace
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => onChange("")}
              >
                Remove
              </Button>
            </div>
          </div>
        ) : (
          <div className="py-6 space-y-2">
            <p className="text-sm text-muted-foreground">
              {uploading
                ? "Uploading..."
                : "Drag and drop an image, or click to browse"}
            </p>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading}
            >
              Choose File
            </Button>
          </div>
        )}
      </div>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif"
        onChange={handleFileChange}
        className="hidden"
      />
      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Or paste an image URL..."
        className="text-xs"
      />
    </div>
  );
}
