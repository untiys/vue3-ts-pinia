type Props = {
  name?: string
}

// 插槽
const B = (_, { slots }) => (
  <>
    <div>{slots.default ? slots.default() : "默认值"}</div>
    <div>{slots?.foo?.()}</div>
  </>
)

import { defineComponent, getCurrentInstance, ref } from "vue"
import useBase64 from "../hooks/index"
import guan from "../assets/image/guz-an.png"
import style from './A.module.css'

export default defineComponent({
  props: {
    name: String,
  },
  emits: ["callback"],
  setup(props: Props, { emit }) {
    const data = [
      {
        name: "张三",
      },
      {
        name: "张三",
      },
      {
        name: "张三",
      },
      {
        name: "张三",
      },
      {
        name: "张三",
      },
    ]

    const fn = (item) => {
      console.log("触发了")
      emit("callback", "触发")
    }

    const slot = {
      default: () => <div>默认插槽</div>,
      foo: () => <div>我是foo插槽</div>,
    }

    useBase64({
        el: "#imguan",
      }).then((res:{baseUrl:string}) => {
        console.log(res.baseUrl)
    })

      const app = getCurrentInstance()



    return () => (
      <>
        <div className={style.title}>名字:{props?.name}</div>
        <hr />
        <B v-slots={slot}></B>
        <hr />
        {data.map((v, i) => {
          // 函数柯里化
          return <div onClick={() => fn(v)}>{v.name + i}</div>
        })}
            {app?.proxy?.$filter('ssss')}
        <img src={guan} id="imguan" alt="" />
      </>
    )
  },
})
