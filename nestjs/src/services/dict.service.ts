import { Dict } from "@/entities/dict.entity";
import { HttpException, HttpStatus, Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { getPageByQueryRunner, queryHas } from "@/common/utils/orm";
import { User } from "@/entities/user.entity";
import {
  DeleteDictDto,
  GetDictsDto,
  PostDictDto,
  PutDictDto,
} from "../models/dict.dto";
import { DictEnumsVo } from "../models/dict.vo";
import { arr2tree } from "@/common/utils/array";

@Injectable()
export class DictService {
  constructor(
    @InjectRepository(Dict)
    private readonly dictRepository: Repository<Dict>
  ) {}
  /**
   * @description 获取字典列表
   * @param parameter
   * @returns
   */
  async getDicts(parameter: GetDictsDto) {
    const { pageSize, current, ...SQLwhere } = parameter;
    const repository = this.dictRepository
      .createQueryBuilder("dict")
      .leftJoinAndSelect(User, "user", "dict.create_user_id = user.id")
      .select([
        "dict.id as id",
        "dict.key as key",
        "dict.value as value",
        "dict.name as name",
        'dict.pid as "pid"',
        "dict.desc as desc",
        "user.username as creator",
      ]);
    const options = {
      where: SQLwhere,
      pageSize,
      current,
      likeKeys: ["name", "key"] as (keyof Dict)[],
    };
    try {
      return await getPageByQueryRunner(repository, options);
    } catch (error) {
      Logger.error(error);
      throw new HttpException(
        "获取字典列表失败",
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
  /**
   * @description 获取字典枚举列表
   * @param parameter
   * @returns
   */
  async getEnums(parameter) {
    const repository = this.dictRepository
      .createQueryBuilder("dict")
      .select([
        "dict.id as id",
        "dict.key as label",
        "dict.value as value",
        'dict.pid as "pid"',
      ])
      .where(parameter);
    try {
      const result = await repository.getRawMany();
      return arr2tree(result) as DictEnumsVo[];
    } catch (error) {
      Logger.error(error);
      throw new HttpException(
        "获取枚举列表失败",
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
  /**
   * @description 获取字典详情
   * @param parameter
   * @returns
   */
  async getDict(parameter) {
    const repository = this.dictRepository
      .createQueryBuilder("dict")
      .leftJoinAndSelect(User, "user", "dict.create_user_id = user.id")
      .select([
        "dict.id as id",
        "dict.name as name",
        "dict.key as key",
        "dict.value as value",
        'dict.create_user_id "userId"',
        'dict.create_at as "createAt"',
        'dict.pid as "pid"',
        "dict.desc as desc",
        'user.username as "creator"',
      ])
      .where(parameter);
    try {
      return await repository.getRawOne();
    } catch (error) {
      Logger.error(error);
      throw new HttpException(
        "获取字典详情失败",
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
  /**
   * @description  新增字典
   * @param parameter
   * @returns
   */
  async postDict(parameter: PostDictDto) {
    await queryHas(this.dictRepository, {
      where: {
        name: parameter.name,
        key: parameter.key,
        value: parameter.value,
      },
      yesOrNo: true,
    });
    try {
      await this.dictRepository.save(parameter);
      return true;
    } catch (error) {
      Logger.error(error);
      throw new HttpException("新增字典失败", HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  /**
   * @description  更新字典
   * @param parameter
   * @returns
   */
  async putDict({ id, ...parameter }: PutDictDto) {
    await Promise.all([queryHas(this.dictRepository, { where: { id } })]);
    try {
      await this.dictRepository.update({ id }, parameter);
      return true;
    } catch (error) {
      Logger.error(error);
      throw new HttpException("更新字典失败", HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  /**
   * @description 删除标签
   * @param parameter
   * @returns
   */
  async deleteDict(parameter: DeleteDictDto) {
    await queryHas(this.dictRepository, { where: parameter });
    try {
      await this.dictRepository.delete(parameter);
      return true;
    } catch (error) {
      Logger.error(error);
      throw new HttpException("删除字典失败", HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
class A {
  a1: string;
  readonly a2: string = "a2";
  a3: string;
  protected a4: string;
}

class B extends A {
  constructor() {
    super();
  }
  test() {
    this.a1;
  }
}
