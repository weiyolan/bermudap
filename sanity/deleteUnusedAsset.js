// This script will find and delete all assets that are not
// referenced (in use) by other documents. Sometimes refered
// to as "orphaned" assets.
//
// Place this script somewhere and run it through
// `sanity exec <script-filename.js> --with-user-token`

import { createClient } from "next-sanity";

/* eslint-disable no-console */
// import client from '../lib/sanity'
// import {client} from 'part:@sanity/base/client'

const config = {
  dataset: "production",
  projectId: "nj2v8ioh",
  apiVersion: "2023-02-06",
  token:
    "skjah3X22oaAE5Z2CpimlZBy3gd7bxQhdK0l3J9MbYYoEsW98wZbMj7WECLnTeFGGUia3XmEXZZDqd4omZdpUloTaTAcz56TO1zVDIvFBNVOpZdMqmroZBMIZSMrWlAkeL4ep0mStEcq4NhjvHpRjwJCGPirwCGCoKJ0Te0NBSbYyTuhOIdl",
  useCdn: false,
};

const client = createClient(config);
const query = `
  *[ _type in ["sanity.imageAsset", "sanity.fileAsset"] ]
  {_id, "refs": count(*[ references(^._id) ])}
  [ refs == 0 ]
  ._id
`

// const query = `
// *[_type == "footer"][]
// `;

export function deleteUnusedAssets() {
//  function getID (id) {
//   console.log(id)
//   return id
//  }

  return client
    .fetch(query)
    // .then((ids)=>{console.log(ids); return ids})
    .then((ids) => {
      if (!ids.length) {
        console.log("No assets to delete");
        return true;
      }

      console.log(`Deleting ${ids.length} assets`);
      return ids
        // .reduce((trx, id) => trx.delete(id._id), client.transaction())
        .reduce((trx, id) => trx.delete(id), client.transaction())
        .commit()
        .then(() => console.log("Done!"));
    })
    .catch((err) => {
      if (err.message.includes("Insufficient permissions")) {
        console.error(err.message);
        console.error("Did you forget to pass `--with-user-token`?");
      } else {
        console.error(err.stack);
      }
    });
}
