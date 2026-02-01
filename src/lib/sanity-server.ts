import { createClient } from 'next-sanity';

export const serverClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: '2023-05-03',
  useCdn: false, // Always false for updates
  token: process.env.SANITY_API_TOKEN, // Only used on server
});
