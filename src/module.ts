import { resolve } from "path";
import { fileURLToPath } from "url";
import { defineNuxtModule, addPlugin, addTemplate } from "@nuxt/kit";
// @ts-ignore
import { useHead } from "#imports";

export interface ModuleOptions {
  enabled?: boolean;
  url?: string;
  title?: string;
  author?: string;
  site_name?: string;
  description?: string;
  theme_color?: string;
  img?: string;
  locale?: string;
  twitter?: boolean;
  opengraph?: boolean;
  twitter_user?: string;
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: "nuxt-metatags",
    configKey: "socialtags",
    compatibility: {
      nuxt: "^3.0.0 || ^2.16.0",
      bridge: true,
    },
    defaults: {
      enabled: true,
    },
  },

  setup(options, nuxt) {
    if (options.enabled) {
      var metaTags = [];

      metaTags.push(
        { name: "title", content: options.title },
        { name: "author", content: options.author },
        { name: "publisher", content: options.author },
        { name: "apple-mobile-web-app-title", content: options.title },
        { name: "theme-color", content: options.theme_color }
      );

      if (options.opengraph) {
        metaTags.push(
          { property: "og:title", content: options.title },
          { property: "og:description", content: options.description },
          { property: "og:type", content: "website" },
          { property: "og:locale", content: options.locale },
          { property: "og:url", content: options.url },
          { property: "og:image", content: options.img },
          { property: "og:site_name", content: options.site_name }
        );
      }

      if (options.twitter) {
        metaTags.push(
          { name: "twitter:site", content: options.twitter_user },
          { name: "twitter:creator", content: options.twitter_user },
          { name: "twitter:title", content: options.title },
          { name: "twitter:description", content: options.description },
          { name: "twitter:image", content: options.img }
        );
      }

      metaTags = metaTags.filter((x) => x.content);

      console.log(metaTags);

      nuxt.options.app.head.meta = metaTags;
    }
  },
});