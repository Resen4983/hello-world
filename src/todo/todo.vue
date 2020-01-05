<template>
    <section id="todo">
        <input 
            type="text"
            placeholder="请说出你的梦想"
            autofocus="autofocus"
            @keyup.enter="addTodo"
        >
        <item 
            v-for="todo in filter_todoList"
            :key="todo.id"
            :todo="todo"
            @removeItem="removeItem"
        />
        <tabs :todoList="todoList"
            :state="selectState"
            @filterStatus="filterStatus"
            @cc="clearCompleted"
        />
    </section>
</template>
<script>
import Item from './item.vue';
import Tabs from './tabs.vue';

export default {
    data(){
        return{
            todoList:[],
            selectState:'all'
        }
    },
    computed:{
        filter_todoList(){
            let t = this.todoList;
            switch(this.selectState){
                case 'all':
                    return t;
                case 'active':
                    return t.filter(i=>!i.status);
                case 'complete':
                    return t.filter(i=>i.status);
                default:
                    return [];
            }
            
        }
    },
    methods:{
        addTodo(e){
            if(!e.target.value) return;
            let l = this.todoList;
            let item={};
            item.id=!l.length ? 0 : l[l.length-1].id+1;
            item.status=0;
            item.content=e.target.value.trim();
            this.todoList.push(item);
            e.target.value='';
        },
        removeItem(id){
            // this.todoList = this.todoList.filter(item => item.id!==id);
            this.todoList.splice(this.todoList.findIndex(item => item.id===id),1);
        },
        filterStatus(state){
            this.selectState = state;
        },
        clearCompleted(){
            this.todoList = this.todoList.filter(item => !item.status);
        }
    },
    components:{
        Item,
        Tabs
    }
}
</script>
<style lang="stylus" scoped>
#todo{
    margin:0 auto
    background rgba(0,0,0,.2)
    width 50%
    height 20%
    padding-top: 20px
    color green
    input {
        position relative
        left 50%
        transform translateX(-50%)
        width:500px;
        height 50px
        
        line-height 50px
        font-size 20px
    }
}
</style>