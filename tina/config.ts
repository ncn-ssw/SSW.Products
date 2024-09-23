import { defineConfig } from "tinacms";
import { PagesSchema } from "./collectionSchema/pages";


const branch =
  process.env.GITHUB_BRANCH ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD ||
  "main";

export default defineConfig({
  branch,
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID, 
  token: process.env.TINA_TOKEN, 

  build: {
    outputFolder: process.env.NODE_ENV === 'production' ? 'admin' : 'admin',
    publicFolder: "public",
  },
  media: {
    tina: {
      mediaRoot: "",
      publicFolder: "public",
    },
  },

  // Define the schema
  schema: {
    collections: [
      PagesSchema, 
    ],
  },
});
