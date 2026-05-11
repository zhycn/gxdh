import type { ScriptProps } from "next/script";
import Script from "next/script";
import { siteUrl } from "@/lib/config";

interface JsonLdProps extends ScriptProps {
  data: Record<string, unknown>;
}

export function JsonLd({ data, ...props }: JsonLdProps) {
  return (
    <Script
      id="json-ld"
      type="application/ld+json"
      // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD requires dangerouslySetInnerHTML for structured data
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
      {...props}
    />
  );
}

export function OrganizationJsonLd() {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: "国信导航",
        url: siteUrl,
        description: "精选网址导航站，提供多分类快捷入口",
        potentialAction: {
          "@type": "SearchAction",
          target: `${siteUrl}/?q={search_term_string}`,
          "query-input": "required name=search_term_string",
        },
      }}
    />
  );
}
