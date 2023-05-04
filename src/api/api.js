import request from "./request.js";

/**
 * 获取城市数据
 */
export function getCity() {
  return request({
    url: `/data/city.json`,
    method: "get",
  });
}

/**
 * 获取热映电影
 */
export function getHotFilm(params = {}) {
  return request({
    url: `/api/mmdb/movie/v3/list/hot.json`,
    params: {
      ct: params.ct || "深圳",
      ci: 20,
      channelId: 4,
    },
    method: "get",
  });
}

/**
 * 触底加载更多热映电影
 */
export function getHitBottomHotFilm(params = {}) {
  return request({
    url: `/api/ajax/moreComingList`,
    params: {
      token: "",
      movieIds:
        params.movieIds ||
        "1203724,341858,34064,1466121,1284648,1335232,1458044,1353495,1455642,1434052",
      optimus_uuid:
        "A59CD250E6C411EDA8A3252CDC64AC51BFFEA973E71549B1A9AADC661520BCE0",
      optimus_risk_level: 71,
      optimus_code: 10,
    },
    method: "get",
  });
}

/**
 * 获取定位城市
 */
export function getPositionCity() {
  return request({
    url: '/bmap/v3/ip?key=bd188f50c39f56e83fc4429eaf14024b',
    method: "get",
  })
}
