<!--
 * @Author: morijiu
 * @Date: 2024-07-08 11:29:12
 * @LastEditors: Do not edit
 * @LastEditTime: 2024-07-14 12:51:52
 * @Description:
 * @FilePath: \Nexior-main\src\components\order\StripePay.vue
-->
<template>
  <el-dialog :model-value="visible" :title="$t('application.title.buyService')" width="500px" center>
    <p class="text-center">
      {{ $t('order.message.buyInExternalUrl') }}
    </p>
  </el-dialog>
</template>

<script lang="ts">
import { orderOperator } from '@/operators';
import { defineComponent } from 'vue';
import { ElDialog } from 'element-plus';
import { IOrder, IOrderDetailResponse, OrderState } from '@/models';

interface IData {
  refreshTimer: any;
}

export default defineComponent({
  name: 'PayOrderDialog',
  components: {
    ElDialog
  },
  props: {
    modelValue: {
      type: Object as () => IOrder,
      required: true
    },
    visible: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  emits: ['hide', 'update:modelValue'],
  data(): IData {
    return {
      refreshTimer: undefined
    };
  },
  watch: {
    visible: {
      handler(val) {
        if (val && this.modelValue.pay_url) {
          window.open(this.modelValue.pay_url, '_blank');
        }
      }
    }
  },
  mounted() {
    this.onRefresh();
  },
  unmounted() {
    if (this.refreshTimer) {
      clearTimeout(this.refreshTimer);
    }
  },
  methods: {
    onRefresh() {
      if (!this.modelValue.id) {
        console.error('id does not exist');
        return;
      }
      orderOperator
        .refresh(this.modelValue.id)
        .then(({ data: data }: { data: IOrderDetailResponse }) => {
          // if not paid, check for next loop
          if (data.state !== OrderState.PAID) {
            let that = this;
            this.refreshTimer = setTimeout(() => {
              that.onRefresh();
            }, 2000);
          } else {
            // paid, just notify parent, and hide the dialog
            this.$emit('hide');
          }
          this.$emit('update:modelValue', data);
        })
        .catch(() => {
          let that = this;
          this.refreshTimer = setTimeout(() => {
            that.onRefresh();
          }, 5000);
        });
    }
  }
});
</script>

<style lang="scss" scoped>
.paycodes {
  padding: 30px 0;
  width: 500px;
  margin: auto;
}
</style>
