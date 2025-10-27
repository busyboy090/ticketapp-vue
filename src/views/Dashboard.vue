<template>
  <div class="min-h-screen max-w-[1440px] mx-auto bg-gray-50">
    <!-- Header -->
    <header class="bg-white shadow-sm py-4 px-6 flex justify-between items-center">
      <h1 class="text-2xl font-bold text-[#4f46e5]">🎟️ TicketApp</h1>
      <button
        @click="handleLogout"
        class="bg-[#4f46e5] hover:bg-[#4e46e5e1] text-white text-sm px-2 py-2 rounded-lg"
      >
        <Loader2 v-if="loading" class="animate-spin h-5 w-5 mx-auto" />
        <div v-else class="items-center gap-2">
          <LogOut size="15" />
          Logout
        </div>
      </button>
    </header>

    <!-- Main Content -->
    <main class="max-w-6xl mx-auto p-6">
      <h2 class="text-xl font-semibold mb-4">Overview</h2>

      <!-- Stats Cards -->
      <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <div class="bg-white rounded-2xl shadow p-5 flex items-center gap-4">
          <Ticket class="text-blue-600" size="36" />
          <div>
            <p class="text-gray-500 text-sm">Total Tickets</p>
            <h3 class="text-2xl font-bold">{{ stats.total }}</h3>
          </div>
        </div>

        <div class="bg-white rounded-2xl shadow p-5 flex items-center gap-4">
          <Clock class="text-amber-500" size="36" />
          <div>
            <p class="text-gray-500 text-sm">Open Tickets</p>
            <h3 class="text-2xl font-bold">{{ stats.open }}</h3>
          </div>
        </div>

        <div class="bg-white rounded-2xl shadow p-5 flex items-center gap-4">
          <CheckCircle class="text-green-600" size="36" />
          <div>
            <p class="text-gray-500 text-sm">Resolved Tickets</p>
            <h3 class="text-2xl font-bold">{{ stats.closed }}</h3>
          </div>
        </div>
      </div>

      <!-- Navigation -->
      <div class="mt-10">
        <button
          @click="router.push('/tickets')"
          class="bg-[#4f46e5] hover:bg-[#4e46e5e1] text-white px-6 py-3 rounded-lg shadow-md"
        >
          Manage Tickets
        </button>
      </div>
    </main>
  </div>
</template>

<script setup>
  import { useRouter } from "vue-router";
  import { LogOut, Ticket, Clock, CheckCircle, Loader2 } from "lucide-vue-next";
  import { getTicketsStats } from "@/services/ticketService";
  import { logoutUser } from "@/services/authService";
  import { ref } from "vue";
  import { toast } from "vue3-toastify";

  // router instance
  const router = useRouter();
  const loading = ref(false)

  const stats = getTicketsStats();

  // handle logout
  const handleLogout = () => {
    if(loading.value) return

    loading.value = true
    try {
      logoutUser();
      router.push("/auth/login");
    } catch (err) {
      toast.error(err.message || "Failed to logout")
    } finally {
      loading.value = false
    }
  };
</script>
