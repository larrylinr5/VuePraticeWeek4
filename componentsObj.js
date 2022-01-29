export default {
    /** 產品元件的物件 */
    productModal: {
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
            productModal = new bootstrap.Modal(document.getElementById('productModal'), {
                keyboard: false,
                backdrop: 'static'
            });
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
    
    },
    /** 刪除元件的物件 */
    delProductModal: {
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
            delProductModal = new bootstrap.Modal(document.getElementById('delProductModal'), {
                keyboard: false,
                backdrop: 'static',
            });
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
    
    }
}