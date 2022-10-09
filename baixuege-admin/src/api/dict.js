import request from "../request";

// 获取字典
export function getDict() {
  return request({
    url: `/dict`,
    method: "get",
  });
}
