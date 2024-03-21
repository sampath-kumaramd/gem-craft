"use client";

import { CldUploadWidget } from 'next-cloudinary';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { ImagePlus, Trash } from 'lucide-react';
import { cn } from "@/lib/utils"

interface fileInformation {
  name: string;
  url: string;
}
interface ImageUploadProps {
  disabled?: boolean;
  onChange: (value: fileInformation) => void;
  onRemove: (value: string) => void;
  value: string[];
  className?:string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  disabled,
  onChange,
  onRemove,
  value,
  className,
  ...props
}) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  let fileInformation:fileInformation = {
    name:"",
    url:""
  }
  
  const onUpload = (result: any) => {
  fileInformation.name = result.info.original_filename;
  fileInformation.url = result.info.secure_url;
  onChange(fileInformation);
  
  };

  if (!isMounted) {
    return null;
  }

  return ( 
    <div   className={cn("mb-5 col-span-1 ",className)} {...props}>
      <div className="mb-4 flex items-center gap-4">
        {value.map((url) => (
          <div key={url} className="relative w-[200px] h-[200px] rounded-md overflow-hidden">
            <div className="z-10 absolute top-2 right-2">
              <Button type="button" onClick={() => onRemove(url)} variant="destructive" size="sm">
                <Trash className="h-4 w-4" />
              </Button>
            </div>
            <Image
              fill
              className="object-cover"
              alt="Image"
              src={url}
            />
          </div>
        ))}
      </div>
      <CldUploadWidget onUpload={onUpload} uploadPreset="cceecjib">
        {({ open }) => {
          const onClick = () => {
            open();
          };

          return (
            <Button 
              type="button" 
              disabled={disabled} 
              variant="secondary" 
              onClick={onClick}
            >
              <ImagePlus className="h-4 w-4 mr-2" />
              Upload an Image
            </Button>
          );
        }}
      </CldUploadWidget>
    </div>
  );
}
 
export default ImageUpload;
