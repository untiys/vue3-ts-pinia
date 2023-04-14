// 代替vue2的require请求本地图片资源方法

export const getAssetsImages = (imageName) => {
  return new URL(`/src/assets/image/${imageName}`, import.meta.url).href
}
