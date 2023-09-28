import { type LoaderArgs, type V2_MetaFunction, json } from "@remix-run/node";
// import { Link, Outlet } from "@remix-run/react";

export const meta: V2_MetaFunction = () => {
  return [{ title: "再躺一会儿吧" }];
};
export async function loader({ params }: LoaderArgs) {
  // params.id;
  return json({ name: "Ryan", date: new Date() });
}
export default function IndexIndex() {
  return (
    <div
      className="text-yellow-500"
      style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}
    >
      <h1>any</h1>
    </div>
  );
}
