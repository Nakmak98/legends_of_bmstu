<template>
    <div id="app">
        <vue-editor id="editor"
                    useCustomImageHandler
                    @image-added="handleImageAdded"
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
                    .post('/task/image', formData)
                    .then(result => {
                        console.log(result.data)
                        Editor.insertEmbed(cursorLocation, "image", "http://5.23.54.233:5050/" + result.data);
                        resetUploader();
                    })
                    .catch(err => {
                        console.log(err);
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