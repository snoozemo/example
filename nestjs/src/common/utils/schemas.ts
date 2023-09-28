import * as GloVoMap from "../../models/index.vo";
import * as GloDtoMap from "../../models";
import * as ArticleVoMap from "../../models/article.vo";
import * as ArticleDtoMap from "../../models/article.dto";
import * as DictVoMap from "../../models/dict.vo";
import * as DictDtoMap from "../../models/dict.dto";
import * as MessageVoMap from "../../models/message.vo";
import * as MessageDtoMap from "../../models/message.dto";
import * as UserVoMap from "../../models/user.vo";
import * as UserDtoMap from "../../models/user.dto";

export const schemas = Object.values({
  ...GloVoMap,
  ...GloDtoMap,
  ...ArticleVoMap,
  ...ArticleDtoMap,
  ...DictVoMap,
  ...DictDtoMap,
  ...MessageVoMap,
  ...MessageDtoMap,
  ...UserVoMap,
  ...UserDtoMap,
});
