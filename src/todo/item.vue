<template>
    <section>
        <input type="checkbox"
            v-model="todo.status"
            class="mui-switch mui-switch-anim"
        >
        <label>{{todo.content}}</label>
        <button type="button"
            @click="deleteItem"
        >X</button>
    </section>
</template>
<script>
export default {
    props: {
        todo:{
            type:Object,
            required:true
        }
    },
    
    methods:{
        deleteItem(e){
            this.$emit('removeItem',this.todo.id)
        }
    }
}
</script>
<style lang="stylus" scoped>
section 
    padding-top 10px
    margin 0 auto 
    width 500px
    height 20%
    label 
        width 400px
        height 30px
        font-size 18px
        color gold
        line-height 30px

    button 
        float: right;
        background: none;
        border: none;
        color: #ccc;
        cursor: pointer;
        width: 30px;
        margin-right: -10px;
.mui-switch {
        width: 52px;
        height: 31px;
        position: relative;
        border: 1px solid #dfdfdf;
        background-color: #fdfdfd;
        box-shadow: #dfdfdf 0 0 0 0 inset;
        border-radius: 20px;
        background-clip: content-box;
        display: inline-block;
        -webkit-appearance: none;
        user-select: none;
        outline: none;
        &:checked {
            border-color: #64bd63;
            box-shadow: #64bd63 0 0 0 16px inset;
            background-color: #64bd63;
        }
        &:before {
            content: '';
            width: 29px;
            height: 29px;
            position: absolute;
            top: 0px;
            left: 0;
            border-radius: 20px;
            background-color: #fff;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.4);
        }
        &:checked:before {
        left: 21px;
    }
    
}
.mui-switch.mui-switch-animbg {
        transition: background-color ease 0.4s;
    }

    .mui-switch.mui-switch-animbg:before {
        transition: left 0.3s;
    }

    .mui-switch.mui-switch-animbg:checked {
        box-shadow: #dfdfdf 0 0 0 0 inset;
        background-color: #64bd63;
        transition: border-color 0.4s, background-color ease 0.4s;
    }

    .mui-switch.mui-switch-animbg:checked:before {
        transition: left 0.3s;
    }

    .mui-switch.mui-switch-anim {
        transition: border cubic-bezier(0, 0, 0, 1) 0.4s, box-shadow cubic-bezier(0, 0, 0, 1) 0.4s;
    }

    .mui-switch.mui-switch-anim:before {
        transition: left 0.3s;
    }

    .mui-switch.mui-switch-anim:checked {
        box-shadow: #64bd63 0 0 0 16px inset;
        background-color: #64bd63;
        transition: border ease 0.4s, box-shadow ease 0.4s, background-color ease 1.2s;
    }

    .mui-switch.mui-switch-anim:checked:before {
        transition: left 0.3s;
    }
    

</style>