<template>
    <div class="pagination">
      <ul>
        <li @click="prevOrNext(-1)">«</li>
        <li
          v-for="(item, index) in pages"
          :key="index"
          :class="{actived: item === currentPage}"
          @click="changePage(item)"
        >{{item}}</li>
        <li @click="prevOrNext(1)">»</li>
      </ul>
    </div>
</template>

<script>
export default {
  name: 'Pagination',
  props: {
    page: {
      type: Number,
    }
  },
  data() {
    return {
      currentPage: this.page,
    }
  },
  computed: {
    pages() {
      const c = this.currentPage
      if (c <= 5) {
        return [1, 2, 3, 4, 5, 6, 7, 8, 9, '...']
      } else {
        return [1, '...', c-3, c-2, c-1, c, c+1, c+2, c+3, '...']
      }
    }
  },
  methods: {
    changePage(item) {
      if (item === this.currentPage) return
      if(typeof item !== 'number') return
      this.currentPage = item
    },
    prevOrNext(n) {
      if(this.currentPage+n === 0) return
      this.currentPage += n
    }
  },
  watch: {
    currentPage: function() {
      this.$emit('handleChangePage',this.currentPage);
    },
    page: function() {
      this.currentPage = this.page
    }
  }

}
</script>

<style lang="scss" scoped>
  .pagination {
    margin: 0;
    ul {
      padding-left: 0;
      list-style: none;
      border-radius: 4px;
      li {
        display: inline;
        background: #fff;
        padding: 4px 12px;
        border: 1px solid #ddd;
        border-left-width: 0;
        color:  #778087;
        cursor: pointer;
        text-align: center;
        font-size: 14px;
        &.actived {
          color: #80bd01;
        }
        &:hover {
          background-color: #f5f5f5;
        }
        &:first-child {
          border-left-width: 1px;
          border-bottom-left-radius: 4px;
          border-top-left-radius: 4px;
        }
        &:last-child {
          border-bottom-right-radius: 4px;
          border-top-right-radius: 4px;
        }
      }
    }
  }
</style>
