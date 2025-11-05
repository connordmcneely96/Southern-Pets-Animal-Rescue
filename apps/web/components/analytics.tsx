import Script from 'next/script';

export function AnalyticsScripts() {
  return (
    <>
      {process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ? (
        <>
          <Script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}`}
          />
          <Script id="ga4-init" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}', {
                anonymize_ip: true
              });
            `}
          </Script>
        </>
      ) : null}
      {process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN ? (
        <Script
          data-domain={process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN}
          defer
          src="https://plausible.io/js/script.outbound-links.js"
        />
      ) : null}
    </>
  );
}
