<template>
  <div class="screen-container" :style="containerStyle">
    <header class="screen-header">
      <div>
        <img :src="headerSrc" alt="" />
      </div>
      <span class="logo">
        <img :src="logoSrc" alt="" />
      </span>
      <!-- -------------------------------------------------- -->
      <!-- 菜单 -->
      <div class="mean">
        <el-menu
          :default-active="activeIndex"
          class="el-menu-demo"
          mode="horizontal"
          @select="handleSelect"
        >
          <el-menu-item index="1" @click="firstPage()">首页</el-menu-item>
          <el-submenu index="2">
            <template slot="title">菜单列表</template>
            <el-menu-item index="2-1" @click="qmj()">球磨机</el-menu-item>
            <el-menu-item index="2-2">选项2</el-menu-item>
            <el-menu-item index="2-3">选项3</el-menu-item>
            <el-submenu index="2-4">
              <template slot="title">选项4</template>
              <el-menu-item index="2-4-1">选项1</el-menu-item>
              <el-menu-item index="2-4-2">选项2</el-menu-item>
              <el-menu-item index="2-4-3">选项3</el-menu-item>
            </el-submenu>
          </el-submenu>
        </el-menu>
      </div>
      <!-- --------------------------------------------------- -->
      <span class="title">广西联辉原料车间球磨机监控系统</span>
      <div class="title-right"></div>
    </header>
    <!-- -------------------------------------------------- -->
    <div class="qmj-body">
      <div class="toub">
        <!--标题 -->
        <span class="hh">联辉企业-球磨机状态监控系统</span>
        <div class="tt">
          <span>数据更新时间: </span> &nbsp;
          <!-- <span>{{nowdate}}</span>
    <span>{{nowtime}}</span> -->
        </div>
      </div>
      <!-- 28个框框 -->
      <div class="kk">
        <ul>
          <li
            class="gradient-border"
            id="box"
            v-for="(item, key, index) in data"
            :key="index"
          >
            <div class="xhao">
              球磨机{{ (index + 1).toString().padStart(2, "0") }}号
            </div>

            <p class="wenzi">
              功率：{{
                (Number(item.Pa) + Number(item.Pb) + Number(item.Pc)) / 1000
              }}kW
            </p>
            <p class="wenzi">
              电流：{{ item.Ia }}A &nbsp;{{ item.Ib }}A &nbsp; {{ item.Ic }}A
              &nbsp;
            </p>

            <p class="wenzi">状态：{{ item.status }}</p>
            <p class="wenzi">持续：{{ item.last_time }}小时</p>
            <p class="wenzi">耗电: &nbsp; {{ item.cost_energy }}kwh</p>
            <p class="wenzi">更新: &nbsp; {{ item.time }}</p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { getThemeValue } from "@/utils/theme_utils";
import axios from "axios";
import { mapState } from "vuex";
// import {getQmj} from '@/api/api'
export default {
  data() {
    return {
      // 页面跳转
      qmj() {
        this.$router.push("/qmj");
      },
      firstPage() {
        this.$router.push("/");
      },
     
      activeIndex: "1",
      activeIndex2: "1",

    

      timer: null, // 定时器名称
      data: "", // 接口数据
      // 请求超时时间
    };
  },
  created() {
    // this.loadQmj();
    this.fetchData(); // 在创建组件时先请求一次接口数据
    this.timer = setInterval(() => {
      // 设置定时器，每隔5秒请求一次接口数据
      this.fetchData();
    }, 5000);
  },

  methods: {
    // 菜单
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    handleChangeTheme() {
      // 修改VueX中数据
      // this.$store.commit('changeTheme')
      this.$socket.send({
        action: "themeChange",
        socketType: "themeChange",
        chartName: "",
        value: "",
      });
    },
    //获取时间
    // timerOneScondRun() {
    //     	let date = new Date();
    //     	// 日期格式  2022年05月31日
    //       this.nowdate =
    //           date.getFullYear() +
    //           "年" +
    //           (date.getMonth() + 1 >= 10
    //           ? date.getMonth() + 1
    //           : "0" + (date.getMonth() + 1)) +
    //           "月" +
    //           (date.getDate() >= 10 ? date.getDate() : "0" + date.getDate())+'日';
    //       // 时间格式 12:11:27
    //       this.nowtime =
    //           date.getHours() +
    //           ":" +
    //           (date.getMinutes() >= 10
    //           ? date.getMinutes()
    //           : "0" + date.getMinutes()) +
    //           ":" +
    //           (date.getSeconds() >= 10 ? date.getSeconds() : "0" + date.getSeconds());
    //     },

    //接口数据
    // async loadQmj() {
    //   const res = await getQmj();

    //   console.log(res.data);

    //   this.dataList = res.data;
    //   console.log(Number(res.data));
    // },

    // 请求接口数据的函数
    fetchData() {
      axios.get("/conn.php").then((res) => {
        this.data = res.data;
      });
    },
  },

  computed: {
    logoSrc() {
      return "/static/img/" + getThemeValue(this.theme).logoSrc;
    },
    headerSrc() {
      return "/static/img/" + getThemeValue(this.theme).headerBorderSrc;
    },
    themeSrc() {
      return "/static/img/" + getThemeValue(this.theme).themeSrc;
    },
    containerStyle() {
      return {
        backgroundColor: getThemeValue(this.theme).backgroundColor,
        color: getThemeValue(this.theme).titleColor,
      };
    },
    ...mapState(["theme"]),
  },

  mounted() {
   
  },
  beforeRouteLeave(to, from, next) {
   
    clearInterval(this.timer);
    this.timer = null;
  },
};
</script>

<style lang="less" scoped>
// @import '../assets/css/animation.css';

.fullscreen {
  position: fixed !important;
  top: 0 !important;
  left: 0 !important;
  width: 100% !important;
  height: 100% !important;
  margin: 0 !important;
  z-index: 100;
}

.com-page .screen-container {
  width: 100%;
 
  padding: 0 20px;
  background-color: #161522;
  color: #fff;
  box-sizing: border-box;
  overflow: scroll;
  height: 100vh;
}
.screen-header {
  width: 100%;
  height: 64px;
  font-size: 20px;
  position: relative;
  > div {
    img {
      width: 100%;
    }
  }

  .mean {
    position: absolute;
    left: 10%;
    top: 50%;
    transform: translate(64%, -64%);
   
  }
  


  .el-menu {
    background-color: rgba(255, 255, 255, 0.03);
  }

  .el-menu.el-menu--horizontal {
    border-bottom: none;
  }
  .el-menu--horizontal > .el-menu-item.is-active {
    color: #909399;
    border-bottom: none;
    font-size: 20px;
    width: 100px;
  }
  .el-menu--horizontal > .el-submenu.is-active .el-submenu__title {
    color: white;
    border-bottom: none;
    font-size: 20px;
    width: 100px;
  }

  .title {
    position: absolute;
    left: 50%;
    top: 50%;
    font-size: 20px;
    transform: translate(-50%, 30%);
  }

  .title-right {
    display: flex;
    align-items: center;
    position: absolute;
    right: 0px;
    top: 50%;
    transform: translateY(-80%);
  }
  .qiehuan {
    width: 28px;
    height: 21px;
    cursor: pointer;
  }
  .datetime {
    font-size: 15px;
    margin-left: 10px;
  }
  .logo {
    position: absolute;
    left: 0px;
    top: 50%;
    transform: translateY(-60%);
    img {
      height: 60px;
      width: 200px;
    }
  }
}
.screen-body {
  width: 100%;
  height: 100%;
  display: flex;
  margin-top: 10px;
  .screen-left {
    height: 100%;
    width: 27.6%;
    #left-top {
      height: 53%;
      position: relative;
    }
    #left-bottom {
      height: 31%;
      margin-top: 25px;
      position: relative;
    }
  }
  .screen-middle {
    height: 100%;
    width: 41.5%;
    margin-left: 1.6%;
    margin-right: 1.6%;
    #middle-top {
      width: 100%;
      height: 56%;
      position: relative;
    }
    #middle-bottom {
      margin-top: 25px;
      width: 100%;
      height: 28%;
      position: relative;
    }
  }
  .screen-right {
    height: 100%;
    width: 27.6%;
    #right-top {
      height: 46%;
      position: relative;
    }
    #right-bottom {
      height: 38%;
      margin-top: 25px;
      position: relative;
    }
  }
}
.resize {
  position: absolute;
  right: 20px;
  top: 20px;
  cursor: pointer;
}

.qmj-body {

}
.toub {
  height: 50px;
  margin-top: 10px;
}
.hh {
  margin-right: 20px;
  font-size: 40px;
  font-family: "宋体";
}
.tt {
  display: inline;
}

// 边框

#box .xhao {
  padding-top: 10px;
  padding-left: 10px;
  font-size: 23px;

  height: 20px;
  width: 300px;
}
#box {
  width: 300px;
  height: 260px;
  color: white;
  font-family: "Raleway";
  font-size: 2.5rem;
}
.gradient-border {
  --borderWidth: 3px;
  background: #0e1c2c;
  position: relative;
  // border-radius: var(--borderWidth);
  animation-fill-mode: forwards;
  border: var(--borderWidth) solid transparent;
border-image-slice: 1;
}
.gradient-border:before {
  content: "";
  position: absolute;
  top: calc(-1 * var(--borderWidth));
  left: calc(-1 * var(--borderWidth));
  height: calc(100% + var(--borderWidth) * 2);
  width: calc(100% + var(--borderWidth) * 2);
  
  z-index: -1; /* 改成-1 */
  animation: animatedgradient 3s ease alternate infinite;
  background-size: 150% 150%;
  border-image-source: linear-gradient(
    60deg,
    #f79533,
    #f37055,
    #ef4e7b,
    #a166ab,
    #5073b8,
    #1098ad,
    #07b39b,
    #6fba82
);
}
@keyframes animatedgradient {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }


.kk ul {
  display: block;
  width: 1830px;
  list-style: none;


}
.kk li {

  margin-right: 65px;
  margin-bottom: 40px;
  width: 300px;
  float: left;

}
#box .wenzi {
  font-size: 16px;
  padding-left: 10px;
}
</style>
