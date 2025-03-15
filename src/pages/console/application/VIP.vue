<template>
  <el-row class="panel">
    <el-col :span="24">
      <el-row>
        <el-col :span="24">
          <h2 class="title">{{ $t('common.title.VIPBuy') }}</h2>
        </el-col>
      </el-row>
      <el-row v-loading="loading">
        <div class="vip-desc">完成任意充值均可获得VIP会员资格</div>
        <div class="details-content">
          <div
            v-for="(item, index) in levelList"
            :key="index"
            :class="{
              'level-card': true,
              'vip-level': !item.isFree
            }"
          >
            <div class="level-header">
              <img src="@/assets/images/vip-bg.png" />
              <div class="level-title">{{ item.levelName }}</div>
              <div class="descriptions">{{ item.levelDesc }}</div>
              <div v-if="item.isActive" class="current-level">当前权益</div>
            </div>
            <div class="details">
              <div class="details-title">- 会员权益 -</div>
              <div class="details-info">
                <p v-for="(info, infoIndex) in item.details" :key="infoIndex">{{ info }}</p>
              </div>
            </div>
          </div>
        </div>
      </el-row>
    </el-col>
  </el-row>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { vipOperator } from '@/operators/vip';
import { IVIPLevel } from '@/models/vip';

export default defineComponent({
  name: 'VIP',
  components: {},
  data() {
    return {
      levelList: [] as IVIPLevel[],
      loading: false
    };
  },
  computed: {},
  mounted() {
    this.fetchLevelList();
  },
  methods: {
    async fetchLevelList() {
      try {
        this.loading = true;
        const response = await vipOperator.getLevelList();
        console.log(response.data);
        this.levelList = response.data.results;
      } catch (error) {
        console.error('获取VIP等级列表失败:', error);
      } finally {
        this.loading = false;
      }
    }
  }
});
</script>

<style lang="scss" scoped>
.title {
  font-size: 26px;
  font-weight: bold;
  margin-bottom: 20px;
  color: var(--el-text-color-primary);
}

.panel {
  padding: 30px;
  width: calc(100% - 300px);
  background-color: var(--el-bg-color-page);
  .el-card {
    padding: 50px 0;
    .price {
      font-size: 20px;
      font-weight: bold;
      &.unfree {
        color: #ff5441;
      }
      &.free {
        color: #29c287;
      }
    }
  }
}

.pagination {
  float: right;
}

.details-content {
  padding: 30px;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  .level-card {
    width: 360px;
    margin-right: 110px;
    margin-bottom: 50px;
    border-radius: 22px;
    background: rgba(42, 44, 49, 1);
    border: 1px solid rgba(79, 81, 86, 1);
    overflow: hidden;
    cursor: pointer;
    transition: all 0.4s;
    .level-header {
      height: 98px;
      background: linear-gradient(198deg, rgba(29, 30, 32, 1) 0%, rgba(50, 52, 56, 1) 100%);
      position: relative;
      text-align: center;
      overflow: hidden;
      img {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        object-fit: contain;
      }
      .level-title {
        color: rgba(213, 211, 205, 1);
        font-size: 18px;
        width: 130px;
        margin: 22px auto 0;
        text-align: right;
        position: relative;
        &::before {
          content: '';
          display: block;
          height: 24px;
          width: 24px;
          background: url('@/assets/images/free.png') center no-repeat;
          background-size: contain;
          position: absolute;
          left: 0px;
          top: 0px;
        }
      }
      .descriptions {
        color: rgba(192, 192, 193, 1);
        margin-top: 1rem;
        font-size: 14px;
      }
      .current-level {
        background: linear-gradient(158.77deg, rgba(58, 59, 62, 1) 0%, rgba(118, 121, 126, 1) 100%);
        position: absolute;
        left: 0;
        top: 22px;
        font-size: 12px;
        width: 68px;
        height: 22px;
        line-height: 22px;
        border-top-right-radius: 14px;
        border-bottom-right-radius: 14px;
        padding-right: 4px;
      }
    }
    .details {
      padding: 26px 26px 30px;
      background: rgba(42, 44, 49, 1);
      .details-title {
        color: #fff;
        font-size: 16px;
        text-align: center;
      }
      .details-info {
        width: 100%;
        p {
          margin-top: 20px;
          line-height: 20px;
          font-size: 14px;
          color: rgba(192, 192, 193, 1);
          text-align: left;
        }
      }
    }
    &.vip-level {
      .level-header {
        background: linear-gradient(198deg, rgba(70, 75, 85, 1) 0%, rgba(50, 52, 56, 1) 100%);
        .level-title {
          color: rgba(204, 132, 60, 1);
          &::before {
            background: url('@/assets/images/unfree.png') center no-repeat;
            background-size: contain;
          }
        }
        .descriptions {
          color: rgba(249, 192, 134, 1);
        }
      }
      .details {
        background: rgba(68, 62, 62, 1);
      }
    }
    &:hover {
      transform: translateY(-4px);
      box-shadow: 0 6px 10px 0 rgba(0, 0, 0, 0.5);
    }
  }
}
</style>
