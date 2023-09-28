import type { LinksFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import stylesheet from "~/styles/index.css";
// import faviconIcon from "../public/favicon.ico";
import { type HTMLAttributes } from "react";
import { useNProgress } from "~/common/nprogress";

/**@description 加载全局样式 */
export const links: LinksFunction = () => [
  { rel: "stylesheet", href: stylesheet },
  // { rel: "icon", href: faviconIcon },
];

export { ErrorBoundary } from "~/components/ErrorBoundary";
export default function App() {
  useNProgress();
  return (
    <Document>
      <Outlet />
    </Document>
  );
}
/**
 * @description  document
 * @param Outlet
 * @returns
 */
function Document({ children }: HTMLAttributes<HTMLBaseElement>) {
  return (
    <html lang="zh">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
