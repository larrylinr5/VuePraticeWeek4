export default {
    aaa: {
        props: ['pages'],
        methods: {
            emitPages(item) {
                this.$emit('emit-pages', item);
            },
        },
        template: `
        <nav aria-label="Page navigation example">
            <ul class="pagination">
                <!-- 左邊箭頭設定 -->
                <li class="page-item" :class="{'disabled': pages.current_page === 1}">
                    <a
                    class="page-link"
                    href="#"
                    aria-label="Previous"
                    @click.prevent="emitPages(pages.current_page - 1)"
                    >
                        <span aria-hidden="true">&laquo;</span>
                    </a>
                </li>
                <!-- 中間區塊設定 -->
                <li
                    v-for="(item, index) in pages.total_pages"
                    :key="index"
                    class="page-item"
                    :class="{'active': item === pages.current_page}"
                    >
                    <span class="page-link" v-if="item === pages.current_page">{{ item }}</span>
                    <a
                    class="page-link"
                    href="#"
                    v-else
                    @click.prevent="emitPages(item)">{{ item }}</a>
                </li>
                <!-- 右邊箭頭設定 -->
                <li class="page-item" :class="{'disabled': pages.current_page === pages.total_pages}">
                    <a
                    class="page-link"
                    href="#"
                    aria-label="Next"
                    @click.prevent="emitPages(pages.current_page + 1)"
                    >
                        <span aria-hidden="true">&raquo;</span>
                    </a>
                </li>
            </ul>
        </nav>
        `
    },

}