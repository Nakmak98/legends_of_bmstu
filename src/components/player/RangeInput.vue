<template>
    <div class="range-container">
        <h2>{{title}}</h2>
        <div class="range-values-container">
            <i>1</i>
            <i>2</i>
            <i>3</i>
            <i>4</i>
            <i>5</i>
            <i>6</i>
            <i>7</i>
            <i>8</i>
            <i>9</i>
            <i>10</i>
        </div>
        <input type="range"
               v-bind="$attrs"
               @input="$emit('input', Number($event.target.value))"
               min="1" max="10"
        >
        <div class="range-hints">
            <div>Cовсем не понравилось</div>
            <div>Очень понравилось</div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "RangeInput",
        props: {
            ranges: Number,
            title: String
        }

    }
</script>

<style scoped>
    .range-container {
        width: 100%;
    }
    input[type="range"] {
        -webkit-appearance: none;
        appearance: none;
        width: 90%;
        height: 5px;
        background-color: #e1bf92;
        outline: none;
        margin: 0;
    }

    input[type="range"]::-webkit-slider-thumb {
        -webkit-appearance: none;
        appearance: none;
        width: 15px;
        height: 15px;
        border-radius: 10px;
        cursor: pointer;
        background: white;
        box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
    }

    .range-values-container {
        width: 90%;
        margin-left: 6%;
        display: flex;
        justify-content: space-between;
    }

    .range-values-container > i {
        margin-left: 1px;
    }

    .range-hints {
        display: flex;
        justify-content: space-between;
    }
    .range-hints > div {
        width: 100px;
    }
</style>