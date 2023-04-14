// 添加水印
export const setWatermark = (id, str1, str2) => {
  let can = document.createElement("canvas")
  can.width = 270
  can.height = 100
  let cans = can.getContext("2d")
  cans.rotate((-20 * Math.PI) / 180)
  cans.font = "17px Vedana"
  cans.fillStyle = "#666666"
  cans.textAlign = "center"
  cans.textBaseline = "Middle"
  cans.fillText(str1, can.width / 2, can.height)
  cans.fillText(str2, can.width / 2, can.height + 20)

  let div = document.getElementById(id)
  div.style.pointerEvents = "none"
  div.style.top = "0px"
  div.style.left = "0px"
  div.style.opacity = "0.35"
  div.style.position = "absolute"
  div.style.width = "100%" //宽高自适应
  div.style.height = "100%"
  div.style.background =
    "url(" + can.toDataURL("image/png") + ") left top repeat"
}

// 移除水印，用v-show可替代显示隐藏
export const removeWatermark = (id) => {
  if (document.getElementById(id) !== null) {
    document.body.removeChild(document.getElementById(id))
  }
}
