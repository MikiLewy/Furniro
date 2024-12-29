'use client';

import { Reorder } from 'framer-motion';
import { Trash } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Table,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { cn } from '@/lib/utils';
import { UploadDropzone } from '@/utils/uploadthing';

import { createProductVariantSchema } from '../../server/validation-schemas/create-product-variant-schema';

const VariantImages = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const { control, setError, getValues } =
    useFormContext<z.infer<typeof createProductVariantSchema>>();

  const { fields, append, remove, update, move } = useFieldArray({
    control,
    name: 'variantImages',
  });

  return (
    <div>
      <FormField
        control={control}
        name="variantImages"
        render={() => (
          <FormItem>
            <FormLabel>Variant Tags</FormLabel>
            <FormControl>
              <UploadDropzone
                className="ut-button:ring-primary cursor-pointer hover:ut-label:text-primary ut-button:bg-primary/85 hover:ut-button:bg-primary ut-button:transition-all ut-button:duration-500 ut-button:text-sm "
                endpoint="productVariant"
                onUploadError={error =>
                  setError('variantImages', {
                    message: error.message,
                    type: 'validate',
                  })
                }
                onBeforeUploadBegin={files => {
                  files.map(file => {
                    append({
                      size: file.size,
                      name: file.name,
                      url: URL.createObjectURL(file),
                    });
                  });
                  return files;
                }}
                onClientUploadComplete={files => {
                  const images = getValues('variantImages');

                  images.map((field, index) => {
                    if (field.url.search('blob:') === 0) {
                      const image = files.find(img => img.name === field.name);

                      if (image) {
                        update(index, {
                          ...image,
                          url: image.url,
                          size: image.size,
                          name: image.name,
                          key: image.key,
                        });
                      }
                    }
                  });
                  return;
                }}
                config={{ mode: 'auto' }}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      {fields.length !== 0 ? (
        <div className="rounded-md overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Size</TableHead>
                <TableHead>Image</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <Reorder.Group
              as="tbody"
              values={fields}
              onReorder={e => {
                const activeElement = fields[activeIndex];

                e.map((item, index) => {
                  if (item === activeElement) {
                    move(activeIndex, index);
                    setActiveIndex(index);
                    return;
                  }
                });
              }}>
              {fields.map((field, index) => (
                <Reorder.Item
                  as="tr"
                  id={field.id}
                  onDragStart={() => setActiveIndex(index)}
                  value={field}
                  key={field.id}
                  className={cn(
                    field.url.search('blob:') === 0
                      ? 'animate-pulse transition-all'
                      : '',
                    'text-sm cursor-grab font-bold text-muted-foreground hover:text-primary',
                  )}>
                  <TableCell>{index}</TableCell>
                  <TableCell>{field.name}</TableCell>
                  <TableCell>
                    {((field?.size || 0) / (1024 * 1024)).toFixed(2)} MB
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center justify-center">
                      <Image
                        src={field.url}
                        width={72}
                        height={48}
                        alt={field.name || ''}
                        className="rounded-md"
                      />
                    </div>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      className="scale-75"
                      onClick={() => {
                        remove(index);
                      }}>
                      <Trash className="h-4" />
                    </Button>
                  </TableCell>
                </Reorder.Item>
              ))}
            </Reorder.Group>
          </Table>
        </div>
      ) : null}
    </div>
  );
};

export default VariantImages;
