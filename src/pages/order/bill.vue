<template>
  <div class="bill">
    <h2 class="bill-title">
      消费记录
      <span>目前共 <b>{{ total }}</b>条记录 </span>
      <span>消费金额 <b>¥ {{ count }}</b> </span>
      <span>一份付出将有十分回报</span>
    </h2>

    <!-- 表格 -->
    <div class="bill-list">
      <el-table :data="billList">
        <el-table-column label="订单编号" prop="orderCode" align="center" />
        <el-table-column label="课程" prop="title" show-overflow-tooltip align="center" />
        <el-table-column label="时间" prop="createdAt" width="180" align="center" />
        <el-table-column label="消费金额" width="100" align="center">
          <template v-slot="{row}">
            ¥ {{ row.cost }}
          </template>
        </el-table-column>
        <el-table-column label="支付方式" prop="payTypeTitle" width="100" />
      </el-table>
    </div>

    <!-- 分页 -->
    <pagination :total="total" :page.sync="page" @change="handlePaginationChange"></pagination>
  </div>
</template>
<script>
import Pagination from 'components/pagination/pagination.vue'
import { getUserBillList } from 'api/order.js'
import { ERR_OK } from 'api/config.js'
export default {
  data () {
    return {
      page: 1,
      total: 0,
      count: 0,
      billList: []
    }
  },
  mounted () {
    this.getBillListData()
  },
  methods: {
    // 分页值更新
    handlePaginationChange (page) {
      this.page = page
      this.getBillListData()
    },
    // 获取用户消费记录数据
    getBillListData () {
      const params = {
        page: this.page,
        size: 10
      }
      getUserBillList(params).then(res => {
        let { error, data, msg } = res
        if (error === ERR_OK) {
          const { items, extra } = data
          this.billList = items || []
          this.total = data.totalCount
          this.count = extra.cost
        } else {
          this.billList = []
          this.total = 0
          this.count = 0
          this.$message.error(msg)
        }
      }).catch(() => {
        this.billList = []
        this.total = 0
        this.count = 0
        this.$message.error('接口异常')
      })
    }
  },
  components: {
    Pagination
  }
}
</script>
<style lang="stylus" scoped>
  .bill
    .bill-title
      margin-bottom: 15px;
      font-size: 16px;
      color: #333;
      font-weight: 700;
      line-height: 48px;
      & > span
        margin-right: 20px;
        font-size: 12px;
        line-height: 24px;
        color: #4d555d;
        &:first-child
          margin-left: 24px;
          padding-left: 24px;
          border-left: 1px solid #d9dde1;
        & > b
          padding: 0 5px;
          color: #f01414;
    .bill-list
      padding: 20px;
      border-radius: 12px;
      background-color: #fff;
      box-shadow: 0 4px 8px 2px rgba(0,0,0,0.1);
      >>> .el-table
        font-size: 12px;
        &::before
          height: 0;
        td
          border-bottom: none;
        th
          border-color: #b7bbbf;
          .cell
            color: #333;
            font-weight: 700;
</style>
