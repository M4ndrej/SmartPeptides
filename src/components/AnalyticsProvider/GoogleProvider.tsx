import Script from "next/script";

const GoogleProvider = () => {
  return (
    <>
      <Script
        async
        src="https://www.googletagmanager.com/gtag/js?id=G-M69LDDNYNV"
      />
      <Script id="google-data-layer">
        {`window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag("js", new Date());
          gtag("config", "G-M69LDDNYNV");`}
      </Script>

      {/* GTM Data */}
      <Script id="gtm-data-layer">
        {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-MRFBV34S');`}
      </Script>

      <noscript>
        <iframe
          src="https://www.googletagmanager.com/ns.html?id=GTM-MRFBV34S"
          height="0"
          width="0"
          style={{ display: "none", visibility: "hidden" }}
        ></iframe>
      </noscript>
    </>
  );
};

export default GoogleProvider;
