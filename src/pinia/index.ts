import { defineStore } from "pinia"

// 第一个参数是应用程序中 store 的唯一 id
export const useStore = defineStore("main", {
  state: () => {
    return {
      // 所有这些属性都将自动推断其类型
      counter: 0,
      name: "Eduardo",
      isAdmin: true,
      users: [
        {
          id: "sss",
        },
      ],
    }
  },
  getters: {
    // 普通调用
    doubleCount: (state) => state.counter * 2,
    // 传参调用
    getUserById: (state) => {
      return (userId) => state.users.find((user) => user.id === userId)
    },
  },
  //  像methods一样，可以执行异步函数
  actions: {
    increment() {
      this.counter++
    },
    randomizeCounter() {
      this.counter = Math.round(100 * Math.random())
    },
  },
})
