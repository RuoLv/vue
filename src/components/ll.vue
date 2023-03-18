<template>
    <div id="app">
      <h1>定时请求示例</h1>
      <p>接口数据: {{ data }}</p >
    </div>
  </template>
  
  <script>
  export default {
    name: "App",
    data() {
      return {
        timer: null, // 定时器名称
        data: null, // 接口数据
        timeout: 3000, // 请求超时时间
      };
    },
    methods: {
      // 请求接口数据的函数
      fetchData() {
        const controller = new AbortController(); // 创建一个控制器对象
        const signal = controller.signal; // 获取一个信号对象
        setTimeout(() => {
          controller.abort(); // 超过指定时间后取消请求
        }, this.timeout);
        fetch("/conn.php", { signal })
          .then((res) => res.json())
          .then((data) => {
            this.data = data;
          })
          .catch((err) => {
            if (err.name === "AbortError") {
              console.warn("请求超时，已跳过");
            } else {
              console.error(err);
            }
          });
      },
    },
    created() {
      this.fetchData(); // 在创建组件时先请求一次接口数据
      this.timer = setInterval(() => {
        // 设置定时器，每隔5秒请求一次接口数据
        this.fetchData();
      }, 5000);
    },
    beforeDestroy() {
      // 在销毁组件前清除定时器
      clearInterval(this.timer);
      this.timer = null;
    },
  };
  </script>
  
  <style>
  #app {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
  }
  </style>