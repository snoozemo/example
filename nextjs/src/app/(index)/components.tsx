"use client";
import { CreateOutline, P5Text, P5Title, P5Box } from "@/components";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Swiper, SwiperSlide } from "swiper/react";

import {
  A11y,
  Autoplay,
  Mousewheel,
  Navigation,
  Pagination,
  Scrollbar,
} from "swiper/modules";
import { useEffect, useState } from "react";
export function Sider() {
  const Pathname = usePathname();
  const GetNowNav = (path: string, title: string) =>
    path === Pathname ? "→ " + title : " " + title;
  return (
    <aside className="relative box-border flex h-full w-72 flex-shrink-0 flex-col justify-between px-5">
      {/* nav link */}
      <div className="flex flex-col space-y-5 text-2xl">
        <Link href={"/"} className="space-x-[2px] hover:scale-105">
          <P5Title>{GetNowNav("/", "首页")}</P5Title>
        </Link>
        <Link href={"/blog"} className="space-x-[2px] hover:scale-105">
          <P5Title>{GetNowNav("/blog", "βlog")}</P5Title>
        </Link>
        <Link href={"/message"} className="space-x-[2px] hover:scale-105">
          <P5Title>{GetNowNav("/message", "留言'板")}</P5Title>
        </Link>
        {/* <Link href={"/message"} className="space-x-2  hover:scale-105">
          <P5Title>编辑</P5Title>
        </Link> */}
        <Link href={"/about"} className="space-x-[2px] hover:scale-105">
          <P5Title>{GetNowNav("/about", "w!th")}</P5Title>
        </Link>
      </div>
    </aside>
  );
}
export function ArticleSwiper() {
  const [IsClient, SetIsClient] = useState(false);
  const [filter, filterId] = CreateOutline({
    lineColor: "#D31400",
  });
  useEffect(() => {
    SetIsClient(true);
  }, []);
  return (
    <>
      {filter}
      {IsClient && (
        <Swiper
          className="h-full min-w-[480px] flex-1"
          direction={"vertical"}
          slidesPerView="auto"
          spaceBetween={2}
          mousewheel={true}
          // pagination={{
          //   clickable: true,
          //   currentClass: "bg-red-500",
          // bulletClass: "bg-red-500",
          // bulletActiveClass: "bg-red-500",
          // type: "progressbar",
          // }}
          // navigation={{}}
          // scrollbar={{
          //   draggable: true,
          //   dragClass: "bg-red-500",
          // }}
          loop={true}
          autoplay={{
            delay: 8000,
          }}
          modules={[
            Mousewheel,
            Pagination,
            Navigation,
            Scrollbar,
            Autoplay,
            A11y,
          ]}
        >
          <SwiperSlide>
            <div className="flex h-full w-full flex-col">
              <div className="flex-shrink-0 space-y-4 px-4">
                <p className="flex-shrink-0 space-x-2 text-6xl">
                  <P5Text
                    style={{ fontWeight: 500 }}
                    rotate
                    color="#D31400"
                    afterColor="#000"
                    beforeColor="#fff"
                  >
                    Lovely
                  </P5Text>
                </p>
                <div className="flex-shrink-0 space-x-1  pb-4 text-right text-sm">
                  <P5Text>2022/11/06</P5Text>
                </div>
              </div>
              <div className="box-border flex w-full flex-1 flex-col space-y-4 p-4">
                <P5Box
                  style={{ filter: `url(#${filterId})` }}
                  className="min-h-[240px] flex-shrink-0 md:h-[240px]"
                >
                  <Image
                    className="h-min-60 w-full object-cover"
                    layout="fill"
                    src="https://static.snoozemo.com/sfs/gdg.jpg"
                    alt="2"
                  />
                </P5Box>
                <div className="flex flex-shrink-0 justify-between">
                  <p className="flex-shrink-0 space-x-[6px] text-right">
                    <P5Text rotate>@ snoozemo</P5Text>
                  </p>
                  <p className="flex-shrink-0 space-x-[6px] text-right">
                    <P5Text rotate>5 Min Read</P5Text>
                  </p>
                </div>
                <p
                  style={{
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: "vertical",
                    display: "-webkit-box",
                  }}
                  className="word-break: h-36 w-full  flex-1 overflow-hidden break-all"
                >
                  {`I offer you my ancestors, my dead men, the ghosts that living
                  men have honoured in marble: my father's father killed in the
                  frontier of Buenos Aires, two bullets through his lungs,`}
                </p>
                <p className="flex-shrink-0 text-right">
                  <Link href="#" className="cursor-pointer space-x-[6px]">
                    <P5Text rotate>↳ See More</P5Text>
                  </Link>
                </p>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="flex h-full w-full flex-col">
              <div className="flex-shrink-0 space-y-4 px-4">
                <p className="flex-shrink-0 space-x-2 text-6xl">
                  <P5Text
                    style={{ fontWeight: 500 }}
                    rotate
                    color="#D31400"
                    afterColor="#000"
                    beforeColor="#fff"
                  >
                    Typescript
                  </P5Text>
                </p>
                <div className="flex-shrink-0 space-x-1  pb-4 text-right text-sm">
                  <P5Text>2022/11/06</P5Text>
                </div>
              </div>
              <div className="box-border flex w-full flex-1 flex-col space-y-4 p-4">
                <P5Box
                  style={{ filter: `url(#${filterId})` }}
                  className="min-h-[240px] flex-shrink-0 md:h-[240px]"
                >
                  <Image
                    className="h-min-60 w-full object-cover"
                    layout="fill"
                    src="https://static.snoozemo.com/sfs/gdg.jpg"
                    alt="2"
                  />
                </P5Box>
                <div className="flex flex-shrink-0 justify-between">
                  <p className="flex-shrink-0 space-x-[6px] text-right">
                    <P5Text rotate>@ snoozemo</P5Text>
                  </p>
                  <p className="flex-shrink-0 space-x-[6px] text-right">
                    <P5Text rotate>5 Min Read</P5Text>
                  </p>
                </div>
                <p
                  style={{
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: "vertical",
                    display: "-webkit-box",
                  }}
                  className="word-break: h-36 w-full  flex-1 overflow-hidden break-all"
                >
                  {`I offer you my ancestors, my dead men, the ghosts that living
                  men have honoured in marble: my father's father killed in the
                  frontier of Buenos Aires, two bullets through his lungs,`}
                </p>
                <p className="flex-shrink-0 text-right">
                  <Link href="#" className="cursor-pointer space-x-[6px]">
                    <P5Text rotate>↳ See More</P5Text>
                  </Link>
                </p>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      )}
    </>
  );
}
