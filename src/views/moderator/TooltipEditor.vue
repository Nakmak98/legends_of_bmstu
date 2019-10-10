<template>
    <div v-if="user.role === 'MODERATOR' || user.role === 'ADMIN'">
        <div v-if="!show_preview" class="basic-block moderator-block">
            <label for="tooltip_task_name">Номер задания</label>
            <div>
                <input required type="text" id="tooltip_task_name" v-model="request_body.task_id">
            </div>
            <label for="tooltip_points">Стоимость подсказки</label>
            <br>
            <div>
                <input required type="text" id="tooltip_points" v-model="request_body.cost">
            </div>
            <br>
            <vue-editor id="editor"
                        :editorToolbar="customToolbar"
                        useCustomImageHandler
                        @image-added="handleImageAdded"
                        v-model="request_body.html">
            </vue-editor>
            <button class="moderator_btn" v-if="$route.params.hint_id" @click="update_tooltip">Обновить
            </button>
            <button class="moderator_btn" v-else @click="send_tooltip">Сохранить</button>
            <button class="moderator_btn red-button" v-if="request_body.hint_id"
                    @click="check_delete_tooltip">Удалить задание
            </button>
            <button class="moderator_btn" @click="show_preview = !show_preview">Предпросмотр</button>
            <button class="moderator_btn" @click="$router.push('/moderator/all_tooltips')">Назад</button>
        </div>
        <div v-if="show_preview">
            <div class="preview basic-block">
                <div class="ql-editor" v-html="request_body.html"></div>
            </div>
            <button class="edit_btn" @click="show_preview = !show_preview">Редактировать</button>
        </div>
    </div>
</template>

<script>
    import Axios from "axios";
    import {VueEditor} from "vue2-editor";
    import {ErrorHandler} from "../../ErrorHandler";

    export default {
        name: 'TooltipEditor',
        components: {
            VueEditor
        },
        data() {
            return {
                request_body: {
                    task_id: null,
                    html: "",
                    cost: null,
                    hint_id: null
                },
                customToolbar: [[{'header': [1, 2, 3, 4, 5, 6, false]}],
                    ["bold", "italic", "underline", "strike"],
                    ["blockquote"],
                    ["link"],
                    [{align: ''}, {align: 'center'}, {align: 'right'}, {align: 'justify'}],
                    [{list: "ordered"}, {list: "bullet"}, {list: "check"}],
                    [{color: ["black", "white", "green", "blue", "purple", "yellow", "#f8e0be", "#f8e0be", "#e1bf92", "#5f3e3b", "#d66363", "#32203a"]},],
                    ["image", "code-block"],],
                answer: "",
                show_preview: false
            };
        },
        beforeRouteEnter(to, from, next) {
            next(vm => {
                if (to.params.hasOwnProperty('task_id'))
                    vm.request_body = to.params;
                next();
            })
        },
        computed: {
            user() {
                return this.$store.state.user
            }
        },
        beforeDestroy() {
            if (this.$store.state.error.message !== null)
                this.$store.commit('deleteErrorMessage')
        },
        methods: {
            check_delete_tooltip() {
                let popup_options = {
                    message: 'Вы действительно хотите удалить задание?',
                    show: true,
                    callback: this.delete_tooltip,
                    args: this.$route.params.hint_id
                };
                this.$store.commit('deleteErrorMessage');
                this.$store.commit('setPopupOptions', popup_options)
            },
            delete_tooltip(hint_id) {
                Axios
                    .delete('hint', {
                        params: {
                            hint_id: hint_id
                        }
                    })
                    .then(() => {
                        alert("Успешно удалено");
                        this.$router.push('/moderator/all_tooltips')
                    })
                    .catch(error => {
                        if (error.response) {
                            new ErrorHandler(error.response, this)
                        } else {
                            this.$router.push('connection_error')
                        }
                    });
            },
            handleImageAdded: function (file, Editor, cursorLocation, resetUploader) {
                var formData = new FormData();
                formData.append("image", file);
                Axios
                    .post('/task/image', formData)
                    .then(result => {
                        Editor.insertEmbed(cursorLocation, "image", Axios.defaults.baseURL + result.data);
                        resetUploader();
                    })
                    .catch(error => {
                        if (error.response) {
                            new ErrorHandler(error.response, this)
                        } else {
                            this.$router.push('connection_error')
                        }
                    });
            },
            send_tooltip() {
                Axios
                    .post('/hint', this.request_body)
                    .then(response => {
                        alert("Успешно сохранено");
                        this.request_body = response.data
                    })
                    .catch(error => {
                        if (error.response) {
                            new ErrorHandler(error.response, this)
                        } else {
                            this.$router.push('connection_error')
                        }
                    });
            },
            update_tooltip() {
                Axios.put('/hint', this.request_body)
                    .then(response => {
                        alert("Успешно обновлено");
                        this.request_body = response.data;
                        this.$store.commit('deleteErrorMessage')
                    })
                    .catch(error => {
                        if (error.response) {
                            new ErrorHandler(error.response, this)
                        } else {
                            this.$router.push('connection_error')
                        }
                    });
            },
        }
    };
</script>

<style>
    .moderator_btn {
        margin: 10px;
    }

    .edit_btn {
        margin: 15px;
        background-color: #e1bf92;
    }

    .quillWrapper {
        background-color: white;
    }

    .answer {
        color: black;
    }
</style>