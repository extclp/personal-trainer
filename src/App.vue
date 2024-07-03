<script setup lang="ts">
import { onHide, onLaunch, onShow } from '@dcloudio/uni-app'

onLaunch(() => {
  console.log('App Launch')
})
onShow(() => {
  console.log('App Show')
})
onHide(() => {
  console.log('App Hide')
})
</script>

<style lang="scss">
@import 'sard-uniapp/index.scss';
@import "nutui-uniapp/styles/index.scss";

page {
  background: #f3f3f3;
  --nut-primary: #FB7206;
  --nut-tag-primary-background-color: #FB7206;
  --nut-tag-font-size: 14px;
}

.nut-form {
  --nut-cell-box-shadow: unset;
  --nut-cell-desc-color: black;
  --nut-cell-group-background-color: transparent;

  .nut-cell {
    margin: 10px 0 !important;
  }

  &-item__top {
    .nut-form-item__label {
      margin-right: unset !important;
      padding-right: unset !important;
    }
  }
}

.table-border {
  .table-cell {
    border: 1px solid #ebeef5;
  }
}
</style>
