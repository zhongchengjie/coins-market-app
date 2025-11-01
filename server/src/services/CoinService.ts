import knex from "knex";
import { dbConf } from "../config";
import { Coins, SearchParams, CoinsQueryResult } from "../types";

const db = knex(dbConf);

export class CoinService {
  // 查询加密货币
  async queryCoins(params: SearchParams = {}): Promise<CoinsQueryResult> {
    const {
      query,
      page = 1,
      limit = 50,
      sort = "market_cap",
      order = "desc",
    } = params;
    const offset = (page - 1) * limit;

    let queryBuilder = db("coins").select("*");

    if (query) {
      queryBuilder = queryBuilder.where(function () {
        this.where("name", "like", `%${query}%`).orWhere(
          "symbol",
          "like",
          `%${query}%`
        );
      });
    }

    let totalQueryBuilder = queryBuilder;

    // 排序
    queryBuilder = queryBuilder.orderBy(
      sort === "change" ? "price_change_percentage_24h" : sort,
      order
    );

    // 分页
    queryBuilder = queryBuilder.limit(limit).offset(offset);

    const list = await queryBuilder;
    // const total = await totalQueryBuilder.count("id as count");

    return {
      list,
      // total: total.length ? Number(total[0].count) : 0,
    };
  }

  // 根据ID获取加密货币
  async queryCoinById(id: number): Promise<Coins | null> {
    const result = await db("coins").where("id", id).first();
    return result || null;
  }

  // 批量插入或更新加密货币
  async upsertCoins(coinsList: Partial<Coins>[]): Promise<void> {
    for (const coinData of coinsList) {
      const existingCoin = await db("coins").where("id", coinData.id).first();
      if (existingCoin) {
        // 更新现有记录
        Object.assign(existingCoin, coinData);
        await db("coins")
          .where("id", existingCoin.id)
          .update({
            ...existingCoin,
            last_updated: new Date(),
          });
      } else {
        // 创建新记录
        await db("coins").insert({
          ...coinData,
          last_updated: new Date(),
        });
      }
    }
  }

  // 收藏的加密货币
  async getFavoriteCoins(user_browser_id: string): Promise<Coins[]> {
    return await db("favorite_coins")
      .where({ user_browser_id })
      .join("coins", "favorite_coins.symbol", "=", "coins.symbol")
      .select("coins.*");
  }

  // 收藏加密货币
  async addFavoriteCoin(
    user_browser_id: string,
    symbol: string
  ): Promise<void> {
    await db("favorite_coins").insert({
      user_browser_id,
      symbol,
      favorite_time: new Date(),
    });
  }

  // 取消收藏加密货币
  async removeFavoriteCoin(
    user_browser_id: string,
    symbol: string
  ): Promise<void> {
    await db("favorite_coins")
      .where({
        user_browser_id,
        symbol,
      })
      .del();
  }

  // 关闭数据库连接
  async close(): Promise<void> {
    await db.destroy();
  }
}
