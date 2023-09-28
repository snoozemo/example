import type { V2_MetaFunction } from "@remix-run/node";
import { Link, Outlet } from "@remix-run/react";
// import { TransitionLoader } from "~/components/TransitionLoader";//TODO

export const meta: V2_MetaFunction = () => {
  return [{ title: "再躺一会儿吧" }];
};

export default function Index() {
  return (
    <div
      className="h-screen w-screen bg-cover bg-center bg-no-repeat"
      style={{
        fontFamily: "system-ui, sans-serif",
        lineHeight: "1.4",
        backgroundImage: "url(/background.webp)",
      }}
    >
      <header className="h-32 w-full">121212</header>
      <h1 className="space-x-4">
        <Link to="/">index</Link>
        <Link to="/blog">blog</Link>
        <Link to="/blog/2">blog/2</Link>
        <Link to="/about">about</Link>
        <Link to="/404">404</Link>
      </h1>
      <hr />
      <Outlet />
    </div>
  );
}
