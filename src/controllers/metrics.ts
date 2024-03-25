// Project

import { redis } from "../lib/redis"

export const metrics = async () => {
  try {
    const results = await redis.zRangeByScoreWithScores('metrics', 0, 50)

    return results.sort((a, b) => b.score - a.score).map(item => {
      return {
        shortLinkId: Number(item.value),
        score: item.value
      }
    })
  } catch (error) {
    console.error(error)
    return
  }
}