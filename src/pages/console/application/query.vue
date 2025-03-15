<template>
  <el-row class="panel">
    <el-col :span="24">
      <el-row>
        <el-col :span="24">
          <h2 class="title">{{ $t('common.title.query') }}</h2>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-card shadow="hover">
            <el-table
              v-loading="loading"
              :data="applications"
              stripe
              table-layout="fixed"
              :empty-text="$t('common.message.noData')"
            >
              <el-table-column :label="$t('application.field.serviceName')" width="220px">
                <template #default="scope">
                  <span>{{ scope.row?.title }}</span>
                </template>
              </el-table-column>
              <el-table-column :label="$t('application.field.price')" width="150px">
                <template #default="scope">
                  <span>{{ scope.row?.price }} 积分</span>
                </template>
              </el-table-column>
              <el-table-column :label="$t('application.field.fileUrl')" width="180px">
                <template #default="scope">
                  <template v-if="scope.row?.file_url">
                    <a :href="scope.row.file_url" target="_blank" class="file-link">
                      {{ getFileName(scope.row.file_url) }}
                    </a>
                    <span class="copy">
                      <copy-to-clipboard :content="scope.row.file_url" class="inline-block" />
                    </span>
                  </template>
                </template>
              </el-table-column>
              <el-table-column :label="$t('application.field.status')" width="80px">
                <template #default="scope">
                  <el-tag :type="getStatusType(scope.row.status)">
                    {{ getStatusText(scope.row.status) }}
                  </el-tag>
                </template>
              </el-table-column>
              <el-table-column :label="$t('application.field.createdAt')" width="220px">
                <template #default="scope">
                  <span>{{ formatDateTime(scope.row.created_at) }}</span>
                </template>
              </el-table-column>
            </el-table>
          </el-card>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <div class="pagination">
            <pagination :current-page="page" :page-size="limit" :total="total" @change="onPageChange"> </pagination>
          </div>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { queryOperator } from '@/operators';
import Pagination from '@/components/common/Pagination.vue';
import CopyToClipboard from '@/components/common/CopyToClipboard.vue';
import { ElTable, ElRow, ElCol, ElTableColumn, ElCard, ElTag } from 'element-plus';
import { IApplication, ICredentialType, IService } from '@/models';

interface IData {
  applications: IApplication[];
  loading: boolean;
  total: number | undefined;
  limit: number;
  form: {
    amount: number | undefined;
  };
  active: {
    service: IService | undefined;
    application: IApplication | undefined;
  };
  credentialType: typeof ICredentialType;
}

export default defineComponent({
  name: 'ConsoleApplicationList',
  components: {
    Pagination,
    CopyToClipboard,
    ElTable,
    ElRow,
    ElCol,
    ElTableColumn,
    ElCard,
    ElTag
  },
  data(): IData {
    return {
      credentialType: ICredentialType,
      applications: [],
      loading: false,
      total: undefined,
      limit: 10
    };
  },
  computed: {
    redirect() {
      return this.$route.query?.redirect;
    },
    page() {
      return parseInt(this.$route.query.page?.toString() || '1');
    }
  },
  watch: {
    page: {
      handler() {
        this.onFetchData();
      }
    },
    type: {
      handler() {
        this.onFetchData();
      }
    }
  },
  mounted() {
    this.onFetchData();
  },
  methods: {
    onPageChange(page: number) {
      this.$router.push({
        name: this.$route.name?.toString(),
        query: {
          ...this.$route.query,
          page: page
        }
      });
    },
    async onFetchData() {
      try {
        this.loading = true;
        const startDate = new Date();
        startDate.setDate(startDate.getDate() - 7);
        const params: IQueryParams = {
          limit: this.limit,
          offset: (this.page - 1) * this.limit,
          start_date: startDate.getTime().toString(),
          end_date: new Date().getTime().toString()
        };
        const response = await queryOperator.getList(params);
        this.applications = response.data.results.map((item) => ({
          ...item,
          created_at: new Date(parseInt(item.created_at)).toLocaleString('zh-CN', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit'
          })
        }));
        this.total = response.data.count;
      } catch (error) {
        console.error('Failed to fetch queries:', error);
      } finally {
        this.loading = false;
      }
    },
    getStatusType(status: string) {
      const statusMap: Record<string, string> = {
        active: 'success',
        pending: 'info',
        failed: 'danger',
        completed: 'warning'
      };
      return statusMap[status] || 'info';
    },
    getStatusText(status: string) {
      const statusTextMap: Record<string, string> = {
        active: '进行中',
        pending: '待处理',
        failed: '失败',
        completed: '已完成'
      };
      return statusTextMap[status] || status;
    },
    formatDateTime(datetime: string) {
      if (!datetime) return '';
      return new Date(datetime).toLocaleString('zh-CN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
      });
    },
    getFileName(url: string): string {
      if (!url) return '';
      return url.split('/').pop() || '';
    }
  }
});
</script>

<style lang="scss" scoped>
.panel {
  padding: 30px;
  width: calc(100% - 300px);
  background-color: var(--el-bg-color-page);

  .title {
    font-size: 26px;
    font-weight: bold;
    margin-bottom: 20px;
    color: var(--el-text-color-primary);
  }
  .el-table {
    min-height: calc(100vh - 350px);
    margin-bottom: 50px;
    .el-button {
      border-radius: 20px;
    }
    .el-tag {
      &.el-tag--success {
        background-color: var(--el-color-success-light-9) !important;
        border-color: var(--el-color-success-light-8) !important;
        color: var(--el-color-success) !important;
      }

      &.el-tag--warning {
        background-color: var(--el-color-warning-light-9) !important;
        border-color: var(--el-color-warning-light-8) !important;
        color: var(--el-color-warning) !important;
      }

      &.el-tag--danger {
        background-color: var(--el-color-danger-light-9) !important;
        border-color: var(--el-color-danger-light-8) !important;
        color: var(--el-color-danger) !important;
      }

      &.el-tag--info {
        background-color: var(--el-color-info-light-9) !important;
        border-color: var(--el-color-info-light-8) !important;
        color: var(--el-color-info) !important;
      }
    }
    .file-link {
      color: var(--el-color-primary);
      text-decoration: none;

      &:hover {
        text-decoration: underline;
      }
    }

    .copy {
      margin-left: 8px;
    }
  }
}

.pagination {
  margin: auto;
  width: fit-content;
}
</style>
