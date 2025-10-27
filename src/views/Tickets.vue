<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <header class="bg-white shadow-sm py-4 px-6 flex justify-between items-center">
      <h1 class="text-2xl font-bold text-[#4f46e5]">🎟️ TicketApp</h1>
      <button
        @click="router.push('/dashboard')"
        class="bg-[#4f46e5] hover:bg-[#4e46e5e1] text-white text-sm px-2 py-2 rounded-lg"
      >
        Back to Dashboard
      </button>
    </header>

    <!-- Main -->
    <main class="max-w-4xl mx-auto p-6">
      <!-- Create / Edit form -->
      <form @submit.prevent="addTicket" class="space-y-2">
        <!-- Title -->
        <div class="space-y-1">
          <label for="title" class="block font-medium">Title *</label>
          <input
            v-model="form.title"
            id="title"
            type="text"
            class="w-full border rounded-lg px-3 py-2 outline-none"
            :class="errors.title ? 'border-red-500' : 'border-gray-300 focus:ring-[#4e46e5e1] focus:ring-2'"
          />
          <p v-if="errors.title" class="text-sm text-red-500">{{ errors.title }}</p>
        </div>

        <!-- Status -->
        <div class="space-y-1">
          <label for="status" class="block font-medium">Status *</label>
          <select
            v-model="form.status"
            id="status"
            class="w-full border rounded-lg px-3 py-2 outline-none"
            :class="errors.status ? 'border-red-500' : 'border-gray-300 focus:ring-[#4e46e5e1] focus:ring-2'"
          >
            <option value="open">Open</option>
            <option value="in_progress">In Progress</option>
            <option value="closed">Closed</option>
          </select>
          <p v-if="errors.status" class="text-sm text-red-500">{{ errors.status }}</p>
        </div>

        <!-- Description -->
        <div class="space-y-1">
          <label for="description" class="block font-medium">
            Description <span class="text-gray-500 text-sm">(optional)</span>
          </label>
          <textarea
            v-model="form.description"
            id="description"
            class="w-full border rounded-lg px-3 py-2 outline-none"
            :class="errors.description ? 'border-red-500' : 'border-gray-300 focus:ring-[#4e46e5e1] focus:ring-2'"
          ></textarea>
          <p v-if="errors.description" class="text-sm text-red-500">{{ errors.description }}</p>
        </div>

        <!-- Priority -->
        <div class="space-y-1">
          <label for="priority" class="block font-medium">
            Priority <span class="text-gray-500 text-sm">(optional)</span>
          </label>
          <select
            v-model="form.priority"
            id="priority"
            class="w-full border rounded-lg px-3 py-2 outline-none"
            :class="errors.priority ? 'border-red-500' : 'border-gray-300 focus:ring-[#4e46e5e1] focus:ring-2'"
          >
            <option value="">Select Priority</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
          <p v-if="errors.priority" class="text-sm text-red-500">{{ errors.priority }}</p>
        </div>

        <!-- Buttons -->
        <div class="flex justify-end gap-3 mt-4">
          <button
            v-if="editingId"
            type="button"
            @click="cancelEdit"
            class="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-lg"
          >
            Cancel
          </button>
          <button
            type="submit"
            class="bg-[#4f46e5] hover:bg-[#4e46e5e1] text-white px-4 py-2 rounded-lg"
          >
            <Loader2 v-if="loading" class="animate-spin h-5 w-5 mx-auto" />
            <div v-else class="lex items-center gap-2">
              <component :is="editingId ? Save : Plus" size="18" />
              {{ editingId ? 'Save Changes' : 'Add Ticket' }}
            </div>
          </button>
        </div>
      </form>

      <!-- Ticket List -->
      <div class="mt-7 shadow rounded-lg p-8">
        <p v-if="tickets.length === 0" class="text-gray-500 text-center">No tickets found.</p>
        <ul v-else class="grid grid-cols-1 md:grid-cols-2 gap-3">
          <TicketCard
            v-for="(ticket, index) in tickets"
            :key="index"
            :ticket="ticket"
            @edit="startEdit"
          />
        </ul>
      </div>
    </main>
  </div>
</template>

<script setup>
    import { ref, onMounted, watch } from "vue";
    import { useRouter } from "vue-router";
    import { toast } from "vue3-toastify";
    import { Plus, Save } from "lucide-vue-next";
    import TicketCard from "@/components/TicketCard.vue";
    import {
    getAllTickets,
    createTicket,
    editTicket,
    getTicketById,
    } from "@/services/ticketService.js";

    // router instance
    const router = useRouter();

    // states
    const tickets = ref(getAllTickets() || []);
    const form = ref({
        title: "",
        description: "",
        status: "open",
        priority: "",
    });
    const errors = ref({});
    const editingId = ref(null);
    const loading = ref(false)

    // load tickets & check session
    onMounted(() => {
        const session = localStorage.getItem("ticketapp_session");
        if (!session) {
            router.push("/auth/login");
        } else {
            tickets.value = JSON.parse(localStorage.getItem("tickets")) || [];
        }
    });

    // when editingId changes, load the ticket data
    watch(editingId, (id) => {
        if (id) {
            form.value = getTicketById(id);
        }
    });

    // validation
    const validate = (data) => {
        const newErrors = {};
        if (!data.title.trim()) newErrors.title = "Title is required.";
        if (!data.status.trim())
            newErrors.status = "Status is required.";
        else if (!["open", "in_progress", "closed"].includes(data.status))
            newErrors.status = "Invalid status.";
        if (data.description && data.description.length > 200)
            newErrors.description = "Description must be under 200 characters.";
        if (data.priority && !["low", "medium", "high"].includes(data.priority))
            newErrors.priority = "Invalid priority.";
        errors.value = newErrors;
        return Object.keys(newErrors).length === 0;
    };

    // add / edit ticket
    const addTicket = () => {
      if(loading.value) return
      if (!validate(form.value)) return;

      loading.value = true
      try {
        if (editingId.value) {
          editTicket({ id: editingId.value, ...form.value });
          tickets.value = getAllTickets();
          editingId.value = null;
          toast.success("Ticket updated successfully!");
        } else {
          createTicket(form.value);
          tickets.value = getAllTickets();
          toast.success("Ticket created successfully!");
        }
      } catch (err) {
        toast.error(`Failed to ${editingId ? "edit" : "create"} ticket.`)
      } finally {
        loading.value = false
      }

      form.value = { title: "", description: "", status: "open", priority: "" };
    };


    const cancelEdit = () => {
        editingId.value = null;
        form.value = { title: "", description: "", status: "open", priority: "" };
    };

    // start editing
    const startEdit = (id) => {
        editingId.value = id;
    };
</script>
