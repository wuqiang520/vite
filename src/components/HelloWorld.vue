<template>
  <div ref="root">
  <!-- <h1>{{ msg }}</h1> -->
  支持人数：{{c1}}<br>
  反对人数： {{c2}}<br>
  支持率1：{{ratio}}<br>
  支持率2：{{ratio2}}<br>
  <button style="margin-right:40px" @click="change(0)">支持</button>
  <button @click="change(1)">反对</button>
  </div>
</template>

<script>
import {unref,ref,reactive, toRefs,computed, watchEffect, watch, onMounted} from 'vue'
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  setup() {//初始化props后，beforeCreate前
    let root = ref(null);
    // 构建响应式数据ref 一般处理简单值的响应式 基于definedProperty
    let a = ref(0);
    let b = ref(0);
    let aV = unref(a);  // unref 将ref转化为普通值， 这是 val = isRef(val) ? val.value : val 的语法糖函数。
    console.log(aV,a.value)

    // 响应式构建方案 reactive 基于proxy对数据深度监听
    let c = reactive({
      c1:1,
      c2:2
    })
    watchEffect(()=>{//初始化执行一次，当里面的响应式数据发生变化时，重新执行一遍函数
      console.log(c.c1);
    })
    // watch(c,()=>{ //懒执行，初始化不执行，响应式数据变化才执行
    //   console.log(c.c1)
    // })
    watch(()=>c.c2,(v,preV)=>{ //懒执行，初始化不执行，响应式数据变化才执行
      console.log(v,preV)
    })
    // watch([a,b],([a,preA],[b,preB])=>{ //同时监听多个
    //   console.log(a,preA)
    // })
    // let ratio = computed(()=>{return (c.c1/(c.c1+c.c2)*100).toFixed(2)+'%'})
    let ratio = computed({
      get:()=>{return (c.c1/(c.c1+c.c2)*100).toFixed(2)+'%'},
      set:(v)=>{c.c1 = v}
    })
    // ratio.value = '2'
    let ratio2 = ref('--');
    watch(c,()=>{
      ratio2.value = (c.c1/(c.c1+c.c2)*100).toFixed(2)+'%';
    })
    // ratio.value = '50%';
    console.log(ratio.value);
    let change = x => {
      x === 0 ? c.c1++ : c.c2++;
    }
    onMounted(()=>{
      console.log(this)
      console.log(root.value)
    })
    return {
      root,
      a,
      b,
      c,
      ratio,
      ratio2,
      ...toRefs(c),
      change
    }
  }
}
</script>
