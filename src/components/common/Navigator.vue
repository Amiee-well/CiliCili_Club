<template>
  <div :direction="direction" class="navigator">
    <div class="top">
      <div v-if="direction === 'column'">
        <logo-tiny @click="onHome" />
      </div>
      <div
        v-for="(sort, sortIndex) in sorts.filter((i) => i.enabled)"
        :key="sortIndex"
        :class="{link: true, active: sort.routes.includes($route.name as string)}"
      >
        <menu-item :menu-list="sort.children">
          <template #main>
            <el-button :class="{button: true, active: sort.routes.includes($route.name as string)}">
              <font-awesome-icon :icon="sort.icon || 'fas fa-question'" />
            </el-button>
          </template>
        </menu-item>
      </div>
    </div>
    <div class="middle" />
    <div class="bottom">
      <div class="link">
        <help-entry>
          <template #main>
            <el-button class="button">
              <font-awesome-icon icon="fas fa-question" />
            </el-button>
          </template>
        </help-entry>
      </div>
      <div class="link">
        <el-tooltip effect="dark" :content="$t('common.nav.darkMode')" placement="right">
          <el-button class="button" @click="darkOperate">
            <font-awesome-icon icon="fas fa-moon" />
          </el-button>
        </el-tooltip>
        <dark-selector ref="darkSelectorRef" :visible="operating.dark" @close="operating.dark = false" />
      </div>
      <div class="link">
        <el-tooltip effect="dark" :content="$t('common.nav.console')" placement="right">
          <el-button class="button" @click="onConsole">
            <font-awesome-icon icon="fas fa-compass" />
          </el-button>
        </el-tooltip>
      </div>
      <div v-if="showSite" class="link">
        <el-tooltip effect="dark" :content="$t('common.nav.site')" placement="right">
          <el-button class="button" @click="onSite">
            <font-awesome-icon icon="fas fa-gear" />
          </el-button>
        </el-tooltip>
      </div>
      <div v-if="showDistribution" class="link">
        <el-tooltip effect="dark" :content="$t('common.nav.distribution')" placement="right">
          <el-button class="button" @click="onDistribution">
            <font-awesome-icon icon="fas fa-coins" />
          </el-button>
        </el-tooltip>
      </div>
      <div v-if="authenticated" class="link">
        <el-tooltip effect="dark" :content="$t('common.nav.logOut')" placement="right">
          <el-button class="button" @click="onLogout">
            <font-awesome-icon icon="fas fa-arrow-right-from-bracket" />
          </el-button>
        </el-tooltip>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { ElButton, ElTooltip } from 'element-plus';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import DarkSelector from './DarkSelector.vue';
import {
  ROUTE_CONSOLE_ROOT,
  ROUTE_PROFILE_INDEX,
  ROUTE_DISTRIBUTION_INDEX,
  ROUTE_INDEX,
  ROUTE_SITE_INDEX
} from '@/router/constants';
import LogoTiny from './LogoTiny.vue';
import HelpEntry from '@/components/common/HelpEntry.vue';
import MenuItem from '@/components/common/MenuItem.vue';
import { useI18n } from 'vue-i18n';

export default defineComponent({
  name: 'Navigator',
  components: {
    ElButton,
    HelpEntry,
    LogoTiny,
    DarkSelector,
    ElTooltip,
    FontAwesomeIcon,
    MenuItem
  },
  props: {
    direction: {
      type: String,
      default: 'column'
    }
  },
  setup() {
    const { t } = useI18n();
    return { t };
  },
  data() {
    return {
      operating: {
        dark: false,
        locale: false
      },
      activeIndex: this.$route.name as string
    };
  },
  computed: {
    sorts() {
      const result = [
        {
          menuName: '文本类',
          english: 'text',
          enabled: true,
          icon: 'far fa-comments',
          routes: [],
          children: []
        },
        {
          menuName: '学习类',
          english: 'study',
          enabled: true,
          icon: 'fas fa-images',
          routes: [],
          children: []
        },
        {
          menuName: '自媒体类',
          english: 'media',
          enabled: true,
          icon: 'fas fa-podcast',
          routes: [],
          children: []
        }
      ];
      // 路由动态赋值
      const configs = this.$store?.state?.site?.features;
      result.forEach((item) => {
        if (configs[item.english]) {
          item.enabled = true;
          // 遍历子菜单
          Object.keys(configs[item.english]).forEach((key) => {
            const child = configs[item.english][key];
            if (child.enabled) {
              item.children.push({
                route: {
                  name: key
                },
                displayName: child.name,
                routes: [key],
                description: child.description,
                icon: child.icon || ['fas', 'question']
              });
            }
          });
        }
      });
      return result;
    },
    authenticated() {
      return !!this.$store.state.token.access;
    },
    showSite() {
      return this.$store?.state?.site?.admins?.includes(this.$store.getters.user?.id);
    },
    showSupport() {
      return (
        this.$store?.state?.site?.features?.support?.enabled &&
        (this.$store?.state?.site?.features?.support?.discord?.enabled ||
          this.$store?.state?.site?.features?.support?.wechat?.enabled)
      );
    },
    showDistribution() {
      return (
        !this.$store?.state?.site?.distribution?.force_inviter_id ||
        this.$store.getters.user?.id === this.$store?.state?.site?.distribution?.force_inviter_id
      );
    },
    showProfile() {
      return true;
    }
  },
  methods: {
    onHome() {
      this.$router.push({
        name: ROUTE_INDEX
      });
    },
    onSite() {
      this.$router.push({
        name: ROUTE_SITE_INDEX
      });
    },
    onDistribution() {
      this.$router.push({
        name: ROUTE_DISTRIBUTION_INDEX
      });
    },
    async onLogout() {
      await this.$store.dispatch('logout');
    },
    onConsole() {
      this.$router.push({ name: ROUTE_CONSOLE_ROOT });
    },
    darkOperate() {
      this.$refs.darkSelectorRef.changeTheme();
    },
    onProfile() {
      this.$router.push({
        name: ROUTE_PROFILE_INDEX
      });
    }
  }
});
</script>

<style lang="scss" scoped>
.navigator {
  display: flex;
  align-items: center;
  position: relative;
  // &[direction='row'] {
  //   flex-direction: row;
  //   padding-top: 10px;
  //   border-top: 1px solid var(--el-border-color);
  //   .chevron,
  //   .logo {
  //     display: none;
  //   }
  //   .top {
  //     display: flex;
  //     flex-direction: row;
  //     align-items: center;
  //     justify-content: space-evenly;
  //     width: 100%;
  //     .link {
  //       text-align: center;
  //       .description {
  //         font-size: 10px;
  //         margin-top: 3px;
  //       }
  //       &.active {
  //         color: var(--el-color-primary);
  //       }
  //     }
  //   }
  //   .bottom {
  //     display: none;
  //   }
  // }
  // &[direction='column'] {
  & {
    flex-direction: column;
    .el-menu {
      width: 150px;
      border-right: none;
      background: none;
      .el-menu-item {
        height: 50px;
        color: var(--el-text-color-primary);
        &.active,
        &:hover,
        &:focus {
          background-color: var(--el-button-hover-bg-color);
          color: var(--el-color-primary);
        }
      }
    }

    .chevron {
      position: absolute;
      right: -12px;
      top: 50%;
      transform: translateY(-50%) scale(0.8);
      z-index: 10;
    }

    .logo {
      width: 80%;
      max-height: 50px;
      cursor: pointer;
      margin: 10px auto 20px auto;
      display: block;
      &.tiny {
        margin: 0 auto 10px auto;
        width: 40px;
        height: 40px;
      }
    }

    .top,
    .bottom {
      display: flex;
      flex-direction: column;
      padding-top: 10px;
      min-width: 60px;
      .link {
        width: 40px;
        height: 40px;
        margin: 0 10px 10px 10px;
        .button {
          width: 40px;
          height: 40px;
          border-radius: 10px;
          border: none;
          color: var(--el-text-color-primary);
          background-color: var(--el-bg-color-page);
          &.active,
          &:hover,
          &:focus {
            color: var(--el-button-active-text-color);
          }
        }
      }
    }
    .bottom {
      display: block;
      position: absolute;
      bottom: 0;
    }
  }
}
</style>
