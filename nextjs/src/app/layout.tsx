import StyledComponentsRegistry from "@/common/styles/registry";
import { Inter } from "next/font/google";
import NextTopLoader from "nextjs-toploader";
import { P5Global, P5_TOKEN_COLOR } from "@/components";
import React from "react";

import "@/common/styles/index.css";
import "@/common/styles/animation.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

const inter = Inter({ subsets: ["vietnamese"] });

export const metadata = {
  title: "再躺一会儿吧",
  description:
    "再躺一会儿吧的博客,前端,snoozemo's blog,web,js,css,html,react,typescript,ts,js,css,html,react,typescript,ts,vue",
  icons: {
    icon: "/images/favicon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh">
      <body className={`${inter.className} `}>
        <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
        <P5Global />
        <BackGroundVideo />
        <NextTopLoader
          height={5}
          showSpinner={false}
          shadow={false}
          color={P5_TOKEN_COLOR.RED}
        />
        {/* <SignInModal /> */}
        <script
          dangerouslySetInnerHTML={{
            __html: `window.REQUEST_BASE_URL="${process.env.REQUEST_BASE_URL}";`,
          }}
        />
      </body>
    </html>
  );
}

export function BackGroundVideo() {
  return (
    <div className="fixed left-0 top-0 -z-[999] h-screen w-screen bg-[#141414]">
      <video
        style={{ objectFit: "cover" }}
        className="absolute left-0 top-0 h-full w-full"
        loop
        disablePictureInPicture
        autoPlay
        muted
        src="/videos/p5_bgstar.mp4"
      ></video>
    </div>
  );
}
