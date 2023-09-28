import { HttpException, HttpStatus, Logger } from "@nestjs/common";
import {
  FindManyOptions,
  Like,
  ILike,
  In,
  SelectQueryBuilder,
  type Repository,
} from "typeorm";

/**
 * @description 处理模糊搜索
 * @param SQLwhere
 * @param likeKeys
 * @returns
 */
export function whereLike(
  // rome-ignore lint/suspicious/noExplicitAny: <explanation>
  SQLwhere: Record<string | number | symbol, any>,
  likeKeys: (keyof typeof SQLwhere)[]
) {
  if (!Object.keys(SQLwhere)?.length) return SQLwhere;
  if (!likeKeys?.length) return SQLwhere;
  likeKeys.forEach((key) => {
    if (SQLwhere[key] && SQLwhere[key]?.constructor === String) {
      SQLwhere[key] = Like(`%${SQLwhere[key]}%`);
    } else if (!SQLwhere[key]) {
      // rome-ignore lint/performance/noDelete: <explanation>
      delete SQLwhere[key];
    }
  });
  return SQLwhere;
}
/**
 * @description 处理翻页页码与页大小
 * @param SQLwhere
 * @param likeKeys
 * @returns
 */
export function skipAndTake(current: number, pageSize: number) {
  return {
    skip: (current - 1) * pageSize, // 分页，跳过几项
    take: pageSize, // 分页，取几项
    cache: true,
  };
}

interface findOptions<T> {
  current: number;
  pageSize: number;
  likeKeys?: (keyof T)[];
}
interface findParamsOptions<T> extends findOptions<T>, FindManyOptions<T> {}

/**
 * @description 分页查询
 * @param repository
 * @param param1
 * @returns
 */
export async function getPage<T>(
  repository: Repository<T>,
  { current, pageSize, likeKeys, ...findParams }: findParamsOptions<T>
) {
  if (findParams.where && likeKeys?.length) {
    findParams.where = whereLike(findParams.where, likeKeys);
  }

  return await repository
    .findAndCount({
      cache: true,
      ...skipAndTake(+current, +pageSize),
      ...findParams,
    })
    .then(([data, total]) => ({
      data,
      total,
      success: true,
      current: +current,
    }));
}

interface queryRunnerOptions<T> extends findOptions<T> {
  whereLeft?: string;
  where: FindManyOptions<T>["where"];
}
/**
 * @description 分页查询 By QueryRunner
 * @param queryRunner
 * @param param1
 * @returns
 */
export async function getPageByQueryRunner<T>(
  queryRunner: SelectQueryBuilder<T>,
  { current, pageSize, likeKeys, ...params }: queryRunnerOptions<T>
) {
  const paging = skipAndTake(+current, +pageSize);

  if (params.where && likeKeys?.length) {
    params.where = whereLike(params.where, likeKeys);
  }

  return await Promise.all([
    queryRunner
      .orderBy({
        id: "DESC",
      })
      .where(
        params.whereLeft || params.where,
        params.whereLeft ? params.where : undefined
      )
      .limit(paging.take)
      .offset(paging.skip)
      .cache(paging.cache)
      .getRawMany(),
    queryRunner.getCount(),
  ]).then(([data, total]) => ({
    data,
    total,
    success: true,
    current: +current,
  }));
}

/**
 * @description 查询是否存在
 * @param repository
 * @param where
 * @param yesOrNo  false 不存在 抛出异常; true 存在 抛出异常;
 */
interface queryHasOption<T> {
  where: FindManyOptions<T>["where"];
  yesOrNo?: boolean;
  errMsg?: string;
}
export async function queryHas<T>(
  repository: Repository<T>,
  { where, yesOrNo = false, errMsg }: queryHasOption<T>
) {
  const result = await repository.count({ where });
  if (!!result === yesOrNo) {
    throw new HttpException(
      errMsg ? errMsg : yesOrNo ? "此项已存在" : "查无此项",
      HttpStatus.BAD_REQUEST
    );
  }
}
