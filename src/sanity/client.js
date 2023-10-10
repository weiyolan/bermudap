// import Image from "next/image";
import {
  // groq,
  createClient,
  // createPortableTextComponent,
  //   definePreview replaces createPreviewSubscriptionHook
} from "next-sanity";
// import imageUrlBuilder from "@sanity/image-url";s
// import { PortableText as PortableTextComponent } from "@portabletext/react";
import { config } from "./config";
// import GetImage from "@utils/getImage";

if (!config.projectId) {
  throw Error("The Project ID is not set. Check your environment variables.");
}

const client = createClient(config);

export default client;
