import { algoliasearch } from 'algoliasearch';

export default algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_ID!,
  process.env.NEXT_PUBLIC_ALGOLIA_WRITE_KEY!,
);
