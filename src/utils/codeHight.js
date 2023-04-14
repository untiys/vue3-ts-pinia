export default {
  mounted(el, binding) {
    let ul = document.createElement("ul")
    let str = binding.value
    let strList = str.split("\n")
    strList.map((e, i) => {
      let li = document.createElement("li")
      let span1 = document.createElement("span")
      let span2 = document.createElement("span")
      span1.innerText = i
      span2.innerText = e
      li.style.display = "flex"
      span1.style.width = "30px"
      span1.style.borderRight = "1px solid #eee"
      span1.style.color = "1px solid #000"
      span1.style.textAlign = "right"
      span1.style.paddingRight = "10px"
      span1.style.userSelect = "none"
      li.appendChild(span1)
      li.appendChild(span2)
      ul.appendChild(li)
    })
    el.appendChild(ul)
  },
  //   updated: function (el, binding) {},
}
