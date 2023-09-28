import { type LoaderArgs, type V2_MetaFunction, json } from "@remix-run/node";
import { useLoaderData, useParams } from "@remix-run/react";
// import { Link, Outlet } from "@remix-run/react";

export const meta: V2_MetaFunction = () => {
  return [{ title: "blog title" }];
};
export async function loader({ params }: LoaderArgs) {
  // params.id;
  return json({ name: "Ryan", date: new Date() });
}
export default function IndexBlogDetails() {
  const params = useParams();
  const data = useLoaderData();
  return (
    <div
      className="text-yellow-500"
      style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}
    >
      <h1>IndexBlogDetails: {params?.id}</h1>
      <p>{JSON.stringify(data)}</p>
    </div>
  );
}
