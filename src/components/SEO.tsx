import { Helmet } from "react-helmet-async";

type Props = {
  title: string;
  description?: string;
  jsonLd?: object;
  image?: string;
};

const SEO = ({ title, description, jsonLd, image }: Props) => (
  <Helmet>
    <title>{title}</title>
    {description && <meta name="description" content={description} />}
    <meta property="og:title" content={title} />
    {description && <meta property="og:description" content={description} />}
    {image && <meta property="og:image" content={image} />}
    {jsonLd && (
      <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
    )}
  </Helmet>
);

export default SEO;
