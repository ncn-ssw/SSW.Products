import NavBarClient from "./NavBarClient";
import client from "../../tina/__generated__/client";

interface NavBarServerProps {
  product: string;
}

export default async function NavBarServer({ product }: NavBarServerProps) {
  const { data } = await client.queries.navigationBar({
    relativePath: `${product}/${product}-NavigationBar.json`,
  });

  return <NavBarClient results={data} />;
}
