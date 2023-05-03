const tabBar = {
  color: "#f03d37",
  list: [
    {
      name: "电影",
      routerUrl: "/",
      icon: require("@/assets/images/icon/film.png"),
      selectIcon: require("@/assets/images/icon/film-active.png"),
    },
    {
      name: "热门",
      routerUrl: "/hot",
      icon: require("@/assets/images/icon/hot.png"),
      selectIcon: require("@/assets/images/icon/hot-active.png"),
    },
    {
      name: "我的",
      routerUrl: "/mine",
      icon: require("@/assets/images/icon/mine.png"),
      selectIcon: require("@/assets/images/icon/mine-active.png"),
    },
  ],
};

module.exports = tabBar;
