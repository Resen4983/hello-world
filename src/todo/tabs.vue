<template>
    <section class="helper">
        <span class="rest">{{restNum}} items left</span>
        <section class="pointer" v-for="s in status"
            :key="s"
        >
            <span
                @click="filterStatus(s)"
            >{{s}}</span>
        </section>
        <span class="pointer" @click="clearCompleted">clear completed</span>
        
    </section>
</template>
<script>
export default {
    props: {
        todoList:{
            type:Array,
            require:true
        },
        state:{
            type:String,
            required:true
        }
    },
    data(){
        return{
            status:['all','active','complete']
        }
    },
    computed:{
        restNum(){
            return this.todoList.filter(i => !i.status).length;
        }
    },
    methods:{
        filterStatus(state){
            this.$emit('filterStatus',state);
        },
        clearCompleted(){
            this.$emit('cc');
        }
    }
}
</script>
<style lang="stylus" scoped>
.helper
    left 0
    display flex
    color greenyellow
    .rest
        width 100px
span
    display inline-block
    padding 0 10px
.pointer:hover
    cursor: pointer

</style>