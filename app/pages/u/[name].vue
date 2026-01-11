<script setup lang="ts">
const { params } = useRoute("u-name");
const { name } = params;

const { data: data } = await useFetch(`/api/user/${name}`);
const { user, loggedIn } = useUserSession();

const isOwner = computed(() => loggedIn.value && user.value?.twitchLogin.toLowerCase() === name.toLowerCase());

if (!data.value) {
  throw createError({ status: 404, message: "Usuario no encontrado", fatal: true });
}

const toast = useToast();
const modalOpen = ref(false);
const riotAccounts = ref(data.value?.riotAccounts || []);
const form = reactive({
  gameName: "",
  tagLine: "",
  region: "",
  iconVerificationId: getRandomIconId()
});

const addAccount = async () => {
  if (!loggedIn.value || !user.value) return;
  const response = await $fetch(`/api/user/${user.value.twitchId}/riotAccount`, {
    method: "POST",
    body: {
      gameName: form.gameName,
      tagLine: form.tagLine,
      region: form.region,
      iconVerificationId: form.iconVerificationId
    }
  }).catch((err) => {
    toast.add({
      title: "Error",
      description: err.data?.message || "Ocurrió un error al agregar la cuenta de Riot."
    });
    return null;
  });
  if (response) {
    riotAccounts.value = [...(riotAccounts.value || []), response];
    modalOpen.value = false;
    toast.add({
      title: "Éxito",
      description: "Cuenta de Riot agregada correctamente.",
      color: "success"
    });
  }
};

const removeAccount = async (puuid: string) => {
  if (!loggedIn.value || !user.value) return;
  await $fetch(`/api/user/${user.value.twitchId}/riotAccount`, {
    method: "DELETE",
    query: { puuid }
  }).catch(() => null);
  if (riotAccounts.value) {
    riotAccounts.value = riotAccounts.value?.filter(acc => acc.puuid !== puuid) || [];
  }
};
</script>

<template>
  <main v-if="data?.user">
    <div class="flex items-center gap-2 mb-2">
      <span class="font-bold text-3xl">{{ data.user.twitchDisplay }}</span>
      <Twemoji v-if="data.user.country" :emoji="data.user.country" png size="2em" />
    </div>
    <div class="grid sm:grid-flow-col lg:grid-rows-24 md:grid-rows-4 sm:grid-rows-4 gap-4">
      <div class="lg:row-span-24 md:row-span-4 sm:row-span-4 flex flex-col gap-1">
        <img v-if="data.user.twitchProfileImage" :src="data.user.twitchProfileImage" alt="Avatar" class="w-full rounded-sm mx-auto">
        <div v-if="data.user.badges" class="flex items-center gap-2 text-lg">
          <!-- TODO: Badges -->
        </div>
        <div v-if="data.user.bio" class="p-3 bg-neutral-500/10 rounded-sm border border-white/10">
          {{ data.user.bio }}
        </div>
      </div>
      <div class="lg:col-span-23 md:col-span-3 sm:col-span-24 grid lg:grid-cols-2 gap-4">
        <template v-if="riotAccounts?.length">
          <div v-for="account in riotAccounts" :key="account.puuid" class="relative overflow-hidden rounded-sm border border-accented p-4 flex flex-col justify-center gap-2 bg-black/20">
            <div class="flex items-center justify-center gap-2 text-xl">
              <img v-if="account.profileIcon" :src="getIconURL(account.profileIcon)" class="w-10 h-10 rounded-full border border-white/10 shadow-lg shadow-black/20" :alt="`Icono de perfil de ${account.gameName}`">
              <span class="font-semibold">{{ account.gameName }}</span>
              <span class="text-neutral-400">#{{ account.tagLine }}</span>
              <span class="text-xs bg-black/50 border border-white/10 px-2 py-1">{{ regionMap.find(r => r.value === account.region)?.label }}</span>
            </div>
            <div class="absolute top-2 right-2 text-xs text-white rounded">
              <div class="flex items-center gap-1">
                <UDropdownMenu :items="[
                  {
                    label: 'Eliminar',
                    onSelect() {
                      removeAccount(account.puuid);
                    },
                  },
                ]"
                >
                  <UButton icon="i-lucide-ellipsis-vertical" variant="ghost" color="neutral" />
                </UDropdownMenu>
              </div>
            </div>
            <div class="flex flex-col items-center gap-2">
              <div class="flex items-center gap-1">
                <img :src="`/images/lol/${account.tier?.toLowerCase() || 'unranked'}.png`" class="w-12 h-12 md:w-12 md:h-12 max-w-fit" :title="account.tier || 'Unranked'">
                <span v-if="account.division" class="font-semibold text-xl">{{ account.division }} · {{ account.lp }} LP</span>
              </div>
              <div v-if="account.wins || account.losses" class="text-sm text-neutral-400 font-semibold"><span class="text-blue-400">{{ account.wins }}</span>V · <span class="text-rose-400">{{ account.losses }}</span>D (<span class="text-white">{{ (account.wins || 0) + (account.losses || 0) }}</span>)</div>
              <span v-if="account.wins || account.losses" class="text-base font-semibold text-white">
                {{
                  account.wins && account.losses
                    ? ((account.wins / (account.wins + account.losses)) * 100).toFixed(2) + '% WR'
                    : 'N/A'
                }}
              </span>
            </div>
          </div>
        </template>
        <div v-if="isOwner" class="relative overflow-hidden rounded-sm border border-dashed border-accented flex items-center justify-center h-48">
          <UModal v-model:open="modalOpen" title="Agregar Riot Account">
            <template #body>
              <UForm @submit.prevent="addAccount">
                <div class="flex flex-col gap-4">
                  <UFieldGroup class="w-full">
                    <UInput v-model="form.gameName" label="gameName" placeholder="Nombre" :ui="{ root: 'w-full' }" required />
                    <UBadge color="neutral" variant="outline" label="#" />
                    <UInput v-model="form.tagLine" label="tagLine" placeholder="Tag" :ui="{ root: 'w-full' }" required />
                  </UFieldGroup>
                  <USelect
                    v-model="form.region"
                    label="region"
                    class="w-full"
                    placeholder="Región"
                    trailing-icon="lucide:chevron-down"
                    :items="regionMap"
                    required
                  />
                  <span class="text-sm text-white">
                    Para verificar la propiedad de la cuenta, por favor cambia tu icono al siguiente icono temporalmente y luego haz clic en "Agregar".
                  </span>
                  <img :src="getIconURL(form.iconVerificationId)" alt="Icono de Verificación" class="w-20 h-20 rounded-full border border-white/10 shadow-lg shadow-black/20 mx-auto">
                  <div class="flex justify-end gap-2">
                    <UButton type="submit" label="Agregar" />
                    <UButton label="Cancelar" color="neutral" @click="modalOpen = false" />
                  </div>
                </div>
              </UForm>
            </template>
            <UButton variant="soft" class="w-full h-full flex items-center justify-center opacity-75" @click="modalOpen = true">
              <Icon name="lucide:plus" class="w-8 h-8" />
            </UButton>
          </UModal>
        </div>
      </div>
    </div>
  </main>
</template>
