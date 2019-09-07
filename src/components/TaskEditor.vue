<template>
    <div id="app">
        <vue-editor id="editor"
                    useCustomImageHandler
                    @image-added="handleImageAdded"
                    @image-removed="handleImageRemoved"
                    v-model="htmlForEditor">
        </vue-editor>
        <button @click="sendTask">Сохранить</button>
    </div>
</template>

<script>
    import { VueEditor } from "vue2-editor";
    import Axios from "axios";
    export default {
        components: {
            VueEditor
        },

        data() {
            return {
                htmlForEditor: "",
                saved: false
            };
        },

        methods: {
            handleImageAdded: function(file, Editor, cursorLocation, resetUploader) {
                console.log(file.name);
                var formData = new FormData();
                formData.append("image", file);
                Axios
                    .put('/img', {
                    data: formData
                    })
                    .then(result => {
                        Editor.insertEmbed(cursorLocation, "image", result.data.url);
                        resetUploader();
                    })
                    .catch(err => {
                        console.log(err);
                    });
            },
            handleImageRemoved: function (image) {
                console.log(image);
                Axios.delete('/img', {image: image.name})
                    .then(response => {
                       console.log(response)
                    })
                    .catch(error => {
                        console.log(error);
                    });
            },
            sendTask: function () {
                console.log("sending")
                Axios.post('/task', {task: this.htmlForEditor})
                        .then(response => {
                           this.saved = true
                           console.log(response)
                        })
                        .catch(error => {
                            console.log(error);
                        });

            }
        }
    };
</script>
<!--<template>-->
<!--    <div id="app">-->
<!--        <vue-editor v-model="content"></vue-editor>-->
<!--    </div>-->
<!--</template>-->

<!--<script>-->
<!--    import { VueEditor } from "vue2-editor";-->

<!--    export default {-->
<!--        components: {-->
<!--            VueEditor-->
<!--        },-->

<!--        data() {-->
<!--            return {-->
<!--                content: "<h1>Some initial content</h1>"-->
<!--            };-->
<!--        }-->
<!--    };-->
<!--</script>-->