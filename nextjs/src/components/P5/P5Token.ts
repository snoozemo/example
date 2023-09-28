export enum P5_TOKEN_COLOR {
  RED = "#D31400",
  NONE = "transparent",
}
export enum P5_TOKEN_ROTATE {
  LEFT = "rotate(-3deg)",
  LEFTX2 = "rotate(-6deg)",
  NONE = "rotate(0deg)",
  RIGHT = "rotate(3deg) skew(3deg, -6deg)",
  RIGHTX2 = "rotate(6deg)",
}
export enum P5_TOKEN_REG_STRING {
  CN_PUNCTUATION_REG = "[。|？|！|，|；|：|“|”|‘|’|（|）|《|》|【|】|…|—|～|￥]",
  EN_PUNCTUATION_REG = "[.|?|!|,|;|:|\"|'|(|)|<|>|[|]|…|—|~|￥]",
  PUNCTUATION_REG = "[。|？|！|，|；|：|“|”|‘|’|（|）|《|》|【|】|…|—|～|￥]|[.|?|!|,|;|:|\"|'|(|)|<|>|[|]|…|—|~|￥]",
}
