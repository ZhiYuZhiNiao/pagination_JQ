;(() => {
  window.addEventListener('DOMContentLoaded', onLoad)
  function onLoad() {
    class Pagination {
      #pageCount /* 最多显示几个 */
      #pageSize /* 一页几条数据 */
      #pageNum /* 当前的页码号 */
      #pageTotal /* 总共有多少页 */
      #pageNumChange
      constructor(
        options = {
          pageCount: 7,
          pageSize: 5,
          pageNum: 1,
          pageTotal: 1,
          pageNumChange: () => {},
        }
      ) {
        const { pageCount, pageSize, pageNum, pageTotal, pageNumChange } =
          options
        this.#pageCount = pageCount || 7
        this.#pageSize = pageSize || 5
        this.#pageNum = pageNum || 1
        this.#pageTotal = pageTotal || 1
        this.#pageNumChange = pageNumChange || (() => {})
        const paginationItemBoxJQ = $('<div></div>')
        paginationItemBoxJQ.addClass('pagination-item-box')
        $('#pagination').append(paginationItemBoxJQ)
        this.#updateDrawByData()
      }

      get pageCount() {
        return this.#pageCount
      }

      get pageSize() {
        return this.#pageSize
      }

      set pageSize(val) {
        this.#pageSize = val
      }

      get pageNum() {
        return this.#pageNum
      }

      set pageNum(val) {
        this.#pageNum = val
        this.#updateDrawByData()
        this.#pageNumChange(val)
      }

      get pageTotal() {
        return this.#pageTotal
      }

      set pageTotal(val) {
        this.#pageTotal = val
      }

      #updateDrawByData() {
        const { pageTotal, pageCount, pageNum } = this
        const temp = (pageCount - 1) / 2 // 3 左边3个，右边3个 3个目前是极限
        // 1 是左边的边界,  pageTotal 是右边的边界
        // 如果左边可以盛放的数量小于3个，则小于总数7个的部分需要右边去多填充
        let left = this.pageNum - 1
        let isLeftBoundary = false
        if (left < temp) {
          // 添加右边的时候需要特殊处理
          left = temp - left
          isLeftBoundary = true
        }
        // 如果右边可以盛放的数量小于3个，则小于总数7个的部分需要左边去多填充
        let right = this.pageTotal - this.pageNum
        let isRightBoundary = false
        if (right < temp) {
          // 添加左边的时候需要特殊处理
          right = temp - right
          isRightBoundary = true
        }

        const middleAry = [{ value: pageNum }]
        /* 添加左边 */
        let n = 0
        for (let i = pageNum - 1; i > 0; i--) {
          n++
          if (n === (isRightBoundary ? right + temp : temp)) {
            if (i > 1) {
              // 增加一个左边的点
              middleAry.unshift({ value: '...' })
              middleAry.unshift({ value: 1 })
              // 最左边设为1
              break
            }
          }
          middleAry.unshift({ value: i })
        }

        /* 添加右边 */
        let j = 0
        for (let i = pageNum + 1; i <= pageTotal; i++) {
          j++
          if (j === (isLeftBoundary ? left + temp : temp)) {
            if (i < this.pageTotal) {
              middleAry.push({ value: '...' })
              middleAry.push({ value: pageTotal })
              break
            }
          }
          middleAry.push({ value: i })
        }
        console.log('middleAry', middleAry)
        this.#draw(middleAry)
      }

      /* 只管画, 你给数据我来画 */
      #draw(data) {
        const self = this
        $('#pagination .pagination-item-box').empty()
        for (const { value } of data) {
          const paginationItemJQ = $(`<div>${value}</div>`)
          if (value !== '...') {
            paginationItemJQ.addClass('pagination-item block')
          } else {
            paginationItemJQ.addClass('block')
          }
          if (value === this.pageNum) {
            paginationItemJQ.addClass('active-pagination-item')
          }

          $('#pagination .pagination-item-box').append(paginationItemJQ)
        }
        $('.pagination-item').click(function (e) {
          $(this)
            .addClass('active-pagination-item')
            .siblings()
            .removeClass('active-pagination-item')
          self.onPaginationItemClick($(this).text())
        })
      }

      onPaginationItemClick(val) {
        this.pageNum = Number(val)
      }
    }

    window.Pagination = Pagination
  }
})()
