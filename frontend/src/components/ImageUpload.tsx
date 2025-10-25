import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Upload, Link as LinkIcon, Loader2 } from 'lucide-react';
import { getApiUrl } from '@/lib/config';
import { useToast } from '@/hooks/use-toast';

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
  label?: string;
}

export function ImageUpload({ value, onChange, label = "Image" }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState(value);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    setImageUrl(value);
  }, [value]);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast({
        title: 'Erreur',
        description: 'Veuillez sélectionner une image',
        variant: 'destructive',
      });
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: 'Erreur',
        description: 'L\'image ne doit pas dépasser 5 Mo',
        variant: 'destructive',
      });
      return;
    }

    setUploading(true);

    try {
      const formData = new FormData();
      formData.append('image', file);

      const response = await fetch(getApiUrl('/api/upload'), {
        method: 'POST',
        body: formData,
        credentials: 'include',
      });

      const data = await response.json();

      if (data.success && data.imageUrl) {
        onChange(data.imageUrl);
        setImageUrl(data.imageUrl);
        toast({
          title: 'Succès',
          description: 'Image uploadée avec succès',
        });
      } else {
        throw new Error(data.error || 'Erreur lors de l\'upload');
      }
    } catch (error) {
      console.error('Upload error:', error);
      toast({
        title: 'Erreur',
        description: error instanceof Error ? error.message : 'Erreur lors de l\'upload de l\'image',
        variant: 'destructive',
      });
    } finally {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleUrlChange = (url: string) => {
    setImageUrl(url);
    onChange(url);
  };

  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <Tabs defaultValue="url" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="url">
            <LinkIcon className="h-4 w-4 mr-2" />
            URL
          </TabsTrigger>
          <TabsTrigger value="upload">
            <Upload className="h-4 w-4 mr-2" />
            Upload
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="url" className="space-y-2">
          <Input
            value={imageUrl}
            onChange={(e) => handleUrlChange(e.target.value)}
            placeholder="/attached_assets/product.jpg ou https://..."
            data-testid="input-image-url"
          />
          {imageUrl && (
            <div className="mt-2">
              <img
                src={imageUrl}
                alt="Preview"
                className="w-full max-w-xs h-32 object-cover rounded border"
                onError={(e) => {
                  e.currentTarget.src = 'https://via.placeholder.com/400x200?text=Image+invalide';
                }}
              />
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="upload" className="space-y-2">
          <div className="flex flex-col gap-2">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              className="hidden"
              data-testid="input-file-upload"
            />
            <Button
              type="button"
              variant="outline"
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading}
              className="w-full"
              data-testid="button-choose-file"
            >
              {uploading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Upload en cours...
                </>
              ) : (
                <>
                  <Upload className="h-4 w-4 mr-2" />
                  Choisir une image
                </>
              )}
            </Button>
            <p className="text-xs text-muted-foreground">
              Format: JPG, PNG, WebP (max 5 Mo)
            </p>
          </div>
          {imageUrl && (
            <div className="mt-2">
              <img
                src={imageUrl}
                alt="Preview"
                className="w-full max-w-xs h-32 object-cover rounded border"
                onError={(e) => {
                  e.currentTarget.src = 'https://via.placeholder.com/400x200?text=Image+invalide';
                }}
              />
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
