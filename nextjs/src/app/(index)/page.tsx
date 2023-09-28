import { P5Text } from "@/components";
import { ArticleSwiper } from "./components";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex h-full w-full">
      {/* issue self */}
      <MessageBoard />
      {/* article self */}
      <ArticleSwiper />
      {/* featured article */}
      <FeaturedBoard />
    </div>
  );
}

function MessageBoard() {
  return (
    <div className="box-border flex h-full w-80 flex-shrink-0 flex-col">
      <div className="space-y-4 px-4">
        <p className="flex-shrink-0 space-x-2 text-6xl">
          <P5Text
            style={{ fontWeight: 500 }}
            rotate
            color="#D31400"
            afterColor="#000"
            beforeColor="#fff"
          >
            For Me
          </P5Text>
        </p>
        <div className="flex-shrink-0 space-x-[6px]  pb-4 text-sm">
          <P5Text>● Message</P5Text>
        </div>
      </div>
      <ul className="mt-4 flex w-full flex-1 flex-col space-y-6 overflow-auto  p-4 text-2xl">
        <li className="flex  space-x-4">
          <P5Text style={{ fontWeight: 500 }} rotate>
            -
          </P5Text>
          <p className="flex-1 space-x-1">
            <P5Text style={{ fontWeight: 500 }} rotate>
              怎么回事呢啊啊啊啊
            </P5Text>
          </p>
        </li>
        <li className="flex  space-x-4">
          <P5Text style={{ fontWeight: 500 }} rotate>
            -
          </P5Text>
          <p className="flex-1 space-x-1">
            <P5Text style={{ fontWeight: 500 }} rotate>
              窗前明月光
            </P5Text>
          </p>
        </li>
        <li className="flex  space-x-4">
          <P5Text style={{ fontWeight: 500 }} rotate>
            -
          </P5Text>
          <p className="flex-1 space-x-1">
            <P5Text style={{ fontWeight: 500 }} rotate>
              怎么回事呢啊啊啊啊
            </P5Text>
          </p>
        </li>
        <li className="flex  space-x-4">
          <P5Text style={{ fontWeight: 500 }} rotate>
            -
          </P5Text>
          <p className="flex-1 space-x-1">
            <P5Text style={{ fontWeight: 500 }} rotate>
              窗前明月光
            </P5Text>
          </p>
        </li>
        <li className="flex  space-x-4">
          <P5Text style={{ fontWeight: 500 }} rotate>
            -
          </P5Text>
          <p className="flex-1 space-x-1">
            <P5Text style={{ fontWeight: 500 }} rotate>
              怎么回事呢啊啊啊啊
            </P5Text>
          </p>
        </li>
        <li className="flex  space-x-4">
          <P5Text style={{ fontWeight: 500 }} rotate>
            -
          </P5Text>
          <p className="flex-1 space-x-1">
            <P5Text style={{ fontWeight: 500 }} rotate>
              窗前明月光
            </P5Text>
          </p>
        </li>
        <li className="flex  space-x-4 ">
          <P5Text style={{ fontWeight: 500 }} rotate>
            -
          </P5Text>
          <p className="flex-1 space-x-1">
            <P5Text style={{ fontWeight: 500 }} rotate>
              do you like watching movies
            </P5Text>
          </p>
        </li>
        <li className="flex  space-x-4 ">
          <P5Text style={{ fontWeight: 500 }} rotate>
            -
          </P5Text>
          <p className="flex-1 space-x-1">
            <P5Text style={{ fontWeight: 500 }} rotate>
              搞快点
            </P5Text>
          </p>
        </li>
        <li className="flex  space-x-4 ">
          <P5Text style={{ fontWeight: 500 }} rotate>
            -
          </P5Text>
          <p className="flex-1 space-x-1">
            <P5Text style={{ fontWeight: 500 }} rotate>
              さいこうだ
            </P5Text>
          </p>
        </li>
      </ul>
    </div>
  );
}

function FeaturedBoard() {
  return (
    <div className="box-border flex h-full w-80 flex-shrink-0 flex-col">
      <div className="mb-4 box-border  flex-shrink-0 px-4 text-sm">
        <div className="flex items-end justify-between">
          <p className="space-x-[6px] text-2xl">
            <P5Text beforeColor="#D31400" rotate>
              Featured
            </P5Text>
          </p>
          <Link href="#" className="space-x-[6px]">
            <P5Text>● See All</P5Text>
          </Link>
        </div>
        <div className="mt-5 border-b"></div>
      </div>
      <ul className="flex-1 space-y-4 overflow-auto p-4">
        <li className="space-y-2">
          <div className="flex items-end justify-between">
            <p className="text-4xl">
              <P5Text>1 .</P5Text>
            </p>
            <p className="space-x-[6px]">
              <P5Text>06.11.2022</P5Text>
            </p>
          </div>
          <p className="space-x-[6px] text-justify">
            <P5Text>比非奶渣</P5Text>
          </p>
          <p>
            bearded and dead, wrapped by his soldiers in the hide of a cow; my s
            grandfather -just twenty four- heading a charge of three hundred men
            in Perú, now ghosts on vanished horses. I offer you whatever insight
            my books may hold. whatever manliness or humour my life.
            作者：Lastockr
          </p>
        </li>
        <li className="space-y-2">
          <div className="flex items-end justify-between">
            <p className="text-4xl">
              <P5Text>2 .</P5Text>
            </p>
            <p className="space-x-[6px]">
              <P5Text>06.11.2022</P5Text>
            </p>
          </div>
          <p className="space-x-[6px] text-justify">
            <P5Text>
              my grandfather just twenty four- heading a charge of three
            </P5Text>
          </p>
          <p>
            bearded and dead, wrapped by his soldiers in the hide of a cow; my s
            grandfather -just twenty four- heading a charge of three hundred men
            in Perú, now ghosts on vanished horses. I offer you whatever insight
            my books may hold. whatever manliness or humour my life.
            作者：Lastockr
          </p>
        </li>
        <li className="space-y-2">
          <div className="flex items-end justify-between">
            <p className="text-4xl">
              <P5Text>3 .</P5Text>
            </p>
            <p className="space-x-[6px]">
              <P5Text>06.11.2022</P5Text>
            </p>
          </div>
          <p className="space-x-[6px] text-justify">
            <P5Text>
              my grandfather just twenty four- heading a charge of three
            </P5Text>
          </p>
          <p>
            bearded and dead, wrapped by his soldiers in the hide of a cow; my s
            grandfather -just twenty four- heading a charge of three hundred men
            in Perú, now ghosts on vanished horses. I offer you whatever insight
            my books may hold. whatever manliness or humour my life.
            作者：Lastockr
          </p>
        </li>
        <li className="space-y-2">
          <div className="flex items-end justify-between">
            <p className="text-4xl">
              <P5Text>4 .</P5Text>
            </p>
            <p className="space-x-[6px]">
              <P5Text>06.11.2022</P5Text>
            </p>
          </div>
          <p className="space-x-[6px] text-justify">
            <P5Text>
              my grandfather just twenty four- heading a charge of three
            </P5Text>
          </p>
          <p>
            bearded and dead, wrapped by his soldiers in the hide of a cow; my s
            grandfather -just twenty four- heading a charge of three hundred men
            in Perú, now ghosts on vanished horses. I offer you whatever insight
            my books may hold. whatever manliness or humour my life.
            作者：Lastockr
          </p>
        </li>
        <li className="space-y-2">
          <div className="flex items-end justify-between">
            <p className="text-4xl">
              <P5Text>5 .</P5Text>
            </p>
            <p className="space-x-[6px]">
              <P5Text>06.11.2022</P5Text>
            </p>
          </div>
          <p className="space-x-[6px] text-justify">
            <P5Text>
              my grandfather just twenty four- heading a charge of three
            </P5Text>
          </p>
          <p>
            bearded and dead, wrapped by his soldiers in the hide of a cow; my s
            grandfather -just twenty four- heading a charge of three hundred men
            in Perú, now ghosts on vanished horses. I offer you whatever insight
            my books may hold. whatever manliness or humour my life.
            作者：Lastockr
          </p>
        </li>
      </ul>
    </div>
  );
}
