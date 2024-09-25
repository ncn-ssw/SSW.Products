import NavBarClient from "./NavBarClient";
import client from "../../tina/__generated__/client";

export default async function NavBarServer() {
  const { data } = await client.queries.navigationBar({
    relativePath: "YakShaver/YakShaver-NavigationBar.json",
  });

  return <NavBarClient results={data} />;
}
