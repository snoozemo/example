import React, { Suspense } from "react";
import IndexLoading from "./loading";
import { Sider } from "./components";
import { P5Text, P5TextMarquee } from "@/components";
import Link from "next/link";
// import { usePathname } from "next/navigation";

export default async function IndexLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      style={{
        backdropFilter: "blur(1px)",
        background:
          "linear-gradient(to left, rgba(255, 0, 0, 0.05),rgba(255, 255, 255, 0.03))",
      }}
      className="box-border h-screen w-screen  space-y-6 overflow-auto"
    >
      <Header />
      <div
        style={{ height: "calc(100vh - 160px)" }}
        className="box-border flex flex-1"
      >
        <Sider />
        <Suspense fallback={<IndexLoading />}>{children}</Suspense>
      </div>
      <Footer />
    </div>
  );
}
function Header() {
  return (
    <header
      style={{
        perspective: "1000px",
      }}
      className="relative -z-10 h-14 w-full pb-5"
    >
      <P5TextMarquee>
        <P5Text> 床前明月光,疑是地上霜,举头望明月,低头思故乡</P5Text>
      </P5TextMarquee>
    </header>
  );
}
function Footer() {
  return (
    <footer className="flex h-14 w-full items-center justify-between px-4 text-3xl shadow shadow-white">
      <p className="flex-shrink-0 text-right text-3xl">
        <P5Text style={{ fontWeight: 500 }} rotate>
          NO.100861122
        </P5Text>
      </p>
      <Link className="space-x-2" href={"/profile"}>
        <P5Text rotate>⚙ Setting</P5Text>
      </Link>
    </footer>
  );
}
