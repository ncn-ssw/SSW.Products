import FooterClient from './FooterClient';
import client from '../../tina/__generated__/client';

interface FooterServerProps {
  product: string;
}

export default async function FooterServer({ product }: FooterServerProps) {
  const { data } = await client.queries.footer({
    relativePath: `${product}/${product}-Footer.json`,
  });

  return <FooterClient results={data} />;
}
