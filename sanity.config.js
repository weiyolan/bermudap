import {defineConfig} from "sanity"
import {structureTool} from "sanity/structure"
import {dashboardTool} from "@sanity/dashboard"
import {netlifyWidget} from "sanity-plugin-dashboard-widget-netlify"
import {myStructure} from "./sanity.structure"
import {visionTool} from "@sanity/vision"
import {schemaTypes} from "./src/sanity/schemas"
import myLogo from "@/sanity/logo"
// import {Love} from './actions'

const config = defineConfig({
  name: "default",
  title: "Bermuda Events Studio",
  projectId: "nj2v8ioh",
  dataset: "production",
  apiVersion: "2023-09-15",
  icon: myLogo,
  basePath: "/studio",
  document: {
    unstable_comments: {
      enabled: false,
    },
  },
  plugins:
    process.env.NODE_ENV === "development" //isDev
      ? [
          structureTool({
            structure: myStructure,
          }),
          visionTool(),
          dashboardTool({
            widgets: [
              netlifyWidget({
                title: "Netlify deploy",
                sites: [
                  {
                    title: "bermuda-events.be",
                    apiId: "8f42a3e4-8645-4b7b-90f6-90b18e3c4a1e",
                    buildHookId: "659d17b45cac66940393e3a1",
                    name: "bermuda-events",
                  },
                ],
              }),
            ],
          }),
        ]
      : [
          structureTool({
            structure: myStructure,
          }),
          dashboardTool({
            widgets: [
              netlifyWidget({
                title: "Netlify deploy",
                sites: [
                  {
                    title: "bermuda-events.be",
                    apiId: "8f42a3e4-8645-4b7b-90f6-90b18e3c4a1e",
                    buildHookId: "659d17b45cac66940393e3a1",
                    name: "bermuda-events",
                  },
                ],
              }),
            ],
          }),
        ],
  document: {
    // actions: [Love],
  },
  schema: {
    types: schemaTypes,
  },
})

export default config
