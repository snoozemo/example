"use client";
import { createHash } from "crypto";
export function P5Global() {
  return (
    <>
      <svg width="0" height="0">
        <filter id="outline">
          <feMorphology
            in="SourceAlpha"
            result="DILATED"
            operator="dilate"
            radius="2"
          />
          <feFlood floodColor="#fff" floodOpacity="1" result="flood" />
          <feComposite
            in="flood"
            in2="DILATED"
            operator="in"
            result="OUTLINE"
          />
          <feMerge>
            <feMergeNode in="OUTLINE" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </svg>
    </>
  );
}
export function CreateOutline({
  lineColor = "#fff",
  lineWidth = "2",
}: P5.CreateOutlineProps) {
  const filter = (
    <>
      <feMorphology
        in="SourceAlpha"
        result="DILATED"
        operator="dilate"
        radius={lineWidth}
      />
      <feFlood floodColor={lineColor} floodOpacity="1" result="flood" />
      <feComposite in="flood" in2="DILATED" operator="in" result="OUTLINE" />
      <feMerge>
        <feMergeNode in="OUTLINE" />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
    </>
  );
  const filterId = createHash("md5").update(filter.toString()).digest("hex");
  return [
    <svg width="0" height="0" key="fi">
      <filter id={filterId}>{filter}</filter>
    </svg>,
    filterId,
  ];
}
