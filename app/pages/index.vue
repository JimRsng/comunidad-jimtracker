<script setup lang="ts">
const { data } = await useFetch("/api/riot-accounts", {
  key: "riot-accounts",
  getCachedData: (key, nuxtApp) => nuxtApp.payload.data[key],
  default: () => [] as JimTableData[]
});

const { data: chatters } = await useLazyFetch("/api/chatters", {
  key: "chatters",
  server: false,
  getCachedData: (key, nuxtApp) => nuxtApp.payload.data[key],
  default: () => [] as string[]
});

const { user, loggedIn } = useUserSession();

const currentUserInfo = computed(() => data.value.find(item => item.user.twitchLogin === user.value?.twitchLogin));
const updateCooldown = import.meta.dev ? 10 : 1800; // segundos (30 minutos)
const now = ref(Date.now());
const lastUpdate = computed(() => currentUserInfo.value?.user?.updatedAt ? new Date(currentUserInfo.value.user.updatedAt).getTime() : 0);
const secondsSinceUpdate = computed(() => Math.floor((now.value - lastUpdate.value) / 1000));
const canUpdate = computed(() => secondsSinceUpdate.value >= updateCooldown);

const updateCurrentUser = async () => {
  if (!loggedIn.value || !user.value?.twitchLogin || !canUpdate.value) return;
  const response = await $fetch(`/api/users/${user.value?.twitchLogin}/update`, {
    method: "POST",
    body: {
      riotAccounts: data.value.filter(item => item.user.twitchLogin === user.value?.twitchLogin).map((item) => {
        return {
          puuid: item.puuid,
          region: item.region
        };
      })
    }
  });
  useCachedData(`user:${user.value.twitchLogin}:riot-accounts`, () => response.riotAccounts);
  useCachedData("riot-accounts", () => undefined); // invalidate leaderboard table cache
};

onMounted(async () => {
  await updateCurrentUser();
});
</script>

<template>
  <main class="flex justify-center items-center">
    <div class="max-w-7xl w-full">
      <TableData :data="data" :chatters="chatters" />
      <USeparator class="my-8" />
      <LazyDataDistribution :data="data" hydrate-on-visible />
    </div>
  </main>
</template>
