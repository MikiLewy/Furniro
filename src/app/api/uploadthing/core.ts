import { createUploadthing, type FileRouter } from 'uploadthing/next';

const f = createUploadthing();

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  avatar: f({
    image: {
      maxFileSize: '2MB',
      maxFileCount: 1,
    },
  }).onUploadComplete(async ({ metadata, file }) => {}),
  productCategory: f({
    image: {
      maxFileSize: '4MB',
      maxFileCount: 1,
    },
  }).onUploadComplete(async ({ metadata, file }) => {}),
  productCategoryMainImage: f({
    image: {
      maxFileSize: '4MB',
      maxFileCount: 1,
    },
  }).onUploadComplete(async ({ metadata, file }) => {}),
  productVariant: f({
    image: {
      maxFileSize: '4MB',
      maxFileCount: 10,
    },
  }).onUploadComplete(async ({ metadata, file }) => {}),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
