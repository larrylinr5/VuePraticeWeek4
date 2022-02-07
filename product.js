import { createApp } from "https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.26/vue.esm-browser.prod.min.js";
import componentsObj from "./componentsObj.js"

//#region 預設一個modal變數
/** 產品的Modal */
let productModal = ''
/** 刪除提示的Modal */
let delProductModal = ''
//#endregion

const app = createApp({
    //區域元件
    components: {
        //分頁元件
        pagination: componentsObj.pagination,
    },
    data() {
        return {
            url: "https://vue3-course-api.hexschool.io/v2",
            path: "larrylinr5",

            /** 產品 */
            products: [],
            /** 產品暫存物件 */
            tempProduct: {
                imagesUrl: []
            },
            //是否為新增
            isNew: false,
            //分頁物件
            pagination: {},
        };
    },
    methods: {
        //檢查是否為管理者
        checkAdmin() {
            //存放token 只需要設定一次
            const tempToken = document.cookie.replace(
                /(?:(?:^|.*;\s*)larryToken\s*\=\s*([^;]*).*$)|^.*$/,
                "$1"
            );
            //axios預設headers
            axios.defaults.headers.common["Authorization"] = tempToken;

            axios
                .post(`${this.url}/api/user/check`)
                // 成功的結果
                .then((response) => {
                    if (response.data.success) this.getProducts();
                })
                // 失敗的結果
                .catch((error) => {
                    alert('非管理權限OR其他api查詢失敗狀況');
                    window.location = "index.html";
                });
        },
        //取得後臺產品列表
        getProducts(page = 1) {
            axios
                .get(`${this.url}/api/${this.path}/admin/products?page=${page}`)
                // 成功的結果
                .then((response) => {
                    if (response.data.success) {
                        this.pagination = response.data.pagination
                        this.products = response.data.products;
                    }
                })
                // 失敗的結果
                .catch((error) => {
                    alert('取得後臺產品列表失敗');
                });
        },
        //開啟Modal
        openModal(isNew, item) {
            //新增
            if (isNew === 'new') {
                this.tempProduct = {
                    imagesUrl: [],
                };
                this.isNew = true;
                productModal.show();
            }
            //編輯
            else if (isNew === 'edit') {
                this.isNew = false;
                this.tempProduct = { ...item };
                productModal.show();
            }
            //刪除
            else if (isNew === 'delete') {
                this.isNew = false;
                this.tempProduct = { ...item };
                delProductModal.show()
            }
        },
    },
    created() {
        //檢核是否為管理者身分
        this.checkAdmin()
    }
});

app.component('product-modal', {
    //綁定的HTML樣板
    template: '#productModal',
    //傳入的資料
    props: ['product', 'isNew'],
    //元件的資料
    data() {
        return {
            url: "https://vue3-course-api.hexschool.io/v2",
            path: "larrylinr5",
            modal: null,
        }
    },
    //
    mounted() {
        productModal = new bootstrap.Modal(this.$refs.productModal);
    },
    //
    methods: {
        //新增產品
        createProduct() {
            axios['post'](`${this.url}/api/${this.path}/admin/product`, { data: this.tempProduct })
                // 成功的結果
                .then((response) => {
                    //彈出成功新增訊息
                    alert('新增成功');
                    //關閉Modal
                    productModal.hide();
                    //重新抓畫面的List
                    this.$emit('update')
                })
                // 失敗的結果
                .catch((err) => {
                    alert('新增產品失敗');
                })
        },
        //編輯選取到的產品
        editProduct() {
            axios['put'](`${this.url}/api/${this.path}/admin/product/${this.product.id}`, { data: this.product })
                // 成功的結果
                .then((response) => {
                    //若成功編輯
                    if (response.data.success) {
                        //彈出成功編輯訊息
                        alert('編輯成功');
                        //關閉Modal
                        productModal.hide();
                        //重新抓畫面的List
                        this.$emit('update')
                    }
                })
                // 失敗的結果
                .catch((err) => {
                    alert('編輯產品失敗');
                })
        },
        //在暫存產品物件內建立 imagesUrl多圖陣列
        createImages() {
            this.tempProduct.imagesUrl = [];
            this.tempProduct.imagesUrl.push('');
        },
        openModal() {
            productModal.show();
        },
        hideModal() {
            productModal.hide();
        },
    },

})

app.component('del-product-modal', {
    //綁定的HTML樣板
    template: '#delProductModal',
    //傳入的資料
    props: ['item'],
    //
    data() {
        return {
            url: "https://vue3-course-api.hexschool.io/v2",
            path: "larrylinr5",
            modal: null,
        }
    },
    mounted() {
        delProductModal = new bootstrap.Modal(this.$refs.delProductModal);
    },
    methods: {
        //刪除選取到的產品
        deleteProduct() {
            axios.delete(`${this.url}/api/${this.path}/admin/product/${this.tempProduct.id}`)
                // 成功的結果
                .then((response) => {
                    //若成功刪除
                    if (response.data.success) {
                        //彈出成功刪除訊息
                        alert(response.data.message);
                        //關閉Modal
                        delProductModal.hide();
                        //重新抓畫面的List
                        this.$emit('update')
                    }

                })
                // 失敗的結果
                .catch((err) => {
                    alert('刪除產品失敗');
                })

        },
        openModal() {
            delProductModal.show();
        },
        hideModal() {
            delProductModal.hide();
        },
    },

})

app.mount("#app");
