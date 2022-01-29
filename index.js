import { createApp } from "https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.26/vue.esm-browser.prod.min.js";

const app = createApp({
    data() {
        return {
            url: "https://vue3-course-api.hexschool.io/v2",
            path: "larrylinr5",
            user: {
                username: "larrylinr5@gmail.com",
                password: "larrylinr5",
            },
        };
    },
    methods: {
        login() {
            axios
                .post(`${this.url}/admin/signin`, this.user)
                //成功
                .then((response) => {
                    if (response.data.success) {
                        const { token, expired } = response.data;
                        // 寫入 cookie token
                        // expires 設置有效時間
                        document.cookie = `larryToken=${token};expires=${new Date(
                            expired
                        )}; path=/`;

                        window.location = "product.html";
                    }
                })
                //失敗
                .catch((error) => {
                    alert(error.data.message);
                });
        },
    },
});

app.mount("#app");
