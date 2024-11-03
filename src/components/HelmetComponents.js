import { Helmet } from "react-helmet";
import ThumbnailImage from "../assets/thumbnail.png";

function HelmetComponents({ title, description }) {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content="React, Helmet" />
      <meta name="author" content="TCT Team" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link rel="canonical" href="http://localhost:3000/" />

      <meta property="og:image" content={<ThumbnailImage />} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:type" content="image/jpeg" />

      <meta name="twitter:image" content={<ThumbnailImage />} />
      <meta name="twitter:card" content="summary_large_image" />

      <meta name="p:domain_verify" content="your-pinterest-verification-code" />
      <meta name="image" content={<ThumbnailImage />} />

      <meta property="og:image" content={<ThumbnailImage />} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="627" />
      <meta property="og:image:type" content="image/jpeg" />
    </Helmet>
  );
}

export default HelmetComponents;
