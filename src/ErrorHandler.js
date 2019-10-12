export class ErrorHandler {
    constructor(response, component_obj) {
        this.obj = component_obj;
        this.response = response;
        switch(this.response.status){
            case 401: this.redirect_to_login(); break;
            case 400:
            case 402:
            case 403: this.show_standart_message(); break;
            case 404: break;
            case 500:
            case 501:
            case 502: this.show_error(); break;
        }
    }

    redirect_to_login() {
        this.obj.$router.push('/auth');
    }

    show_standart_message() {
        this.obj.$store.commit('setErrorMessage', {
            header: "Ошибка",
            message: this.response.data.message
        });
    }
    show_error() {
        // this.obj.$store.commit('setErrorMessage', {
        //     header: "Не отвлекайте, пожалуйста, сервер",
        //     message: "Ведется подсчет баллов."
        // });
    }
}
