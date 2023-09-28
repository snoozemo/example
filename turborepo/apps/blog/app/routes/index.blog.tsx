import type { V2_MetaFunction } from "@remix-run/node";
// import { Link, Outlet } from "@remix-run/react";

export const meta: V2_MetaFunction = () => {
  return [{ title: "New Remix App" }];
};

export default function IndexBlog() {
  return (
    <div
      className="text-yellow-500"
      style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}
    >
      <h1>IndexBlog</h1>
    </div>
  );
}
