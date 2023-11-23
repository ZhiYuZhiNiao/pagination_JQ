;(() => {
  window.addEventListener('DOMContentLoaded', onLoad)
  function onLoad() {
    class Pagination {
      pageCount/* 最多显示几个 */
      pageSize/* 一页几条数据 */
      pageNum/* 当前的页码号 */
      pageTotal/* 总共有多少页 */
      constructor(options = { pageCount: 7, pageSize: 5, pageNum: 1, pageTotal: 1}) {
        const { pageCount, pageSize, pageNum, pageTotal } = options
        this.pageCount = pageCount
        this.pageSize = pageSize
        this.pageNum = pageNum
        this.pageTotal = pageTotal
      }
    }

    window.Pagination = Pagination
  }
})()