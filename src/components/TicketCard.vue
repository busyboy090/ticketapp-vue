<template>
  <li v-if="show" class="bg-white p-4 rounded-xl shadow flex flex-col">
    <div class="flex justify-between items-center w-full">
      <!-- Title -->
      <h4 class="font-bold">{{ ticket.title }}</h4>

      <div class="flex gap-3">
        <!-- Edit Button -->
        <button type="button" @click="handleEdit">
          <Edit3 size="15" class="text-[#4e46e5e1]" />
        </button>

        <!-- Delete Button -->
        <button type="button" @click="handleDelete">
          <Trash2 size="15" class="text-[red]" />
        </button>
      </div>
    </div>

    <!-- Details -->
    <div class="space-y-2 mt-2">
      <p v-if="ticket.description" class="text-sm">
        Description:
        <span class="text-[0.7rem]">{{ ticket.description }}</span>
      </p>

      <!-- Status -->
      <div class="flex items-center justify-between">
        <p class="text-sm">Status</p>
        <div
          :class="statusClass"
          class="p-2 rounded-full text-[0.7rem] font-bold"
        >
          {{ statusText }}
        </div>
      </div>

      <!-- Priority -->
      <div v-if="ticket.priority" class="flex items-center justify-between">
        <p class="text-sm">Priority</p>
        <div
          :class="priorityClass"
          class="p-2 rounded-full text-[0.7rem] font-bold"
        >
          {{ ticket.priority }}
        </div>
      </div>

      <p class="text-sm">
        Created At:
        <span class="text-[0.7rem]">{{ ticket.createdAt }}</span>
      </p>
    </div>
  </li>
</template>

<script setup>
    import { ref, computed } from "vue";
    import { Edit3, Trash2 } from "lucide-vue-next";
    import { deleteTicket } from "../services/ticketService";

    // Props
    const props = defineProps({
        ticket: { type: Object, required: true },
        onEdit: { type: Function, required: true },
        onRemove: { type: Function, required: false },
    });

    const show = ref(true);

    // Handle Edit
    const handleEdit = () => {
        props.onEdit(props.ticket.id);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    // Handle Delete
    const handleDelete = () => {
        deleteTicket(props.ticket.id);
        show.value = false;
        if (props.onRemove) props.onRemove(props.ticket.id);
    };

    const statusClass = computed(() => {
        if (props.ticket.status === "open") return "bg-green-100 text-green-700";
        if (props.ticket.status === "in_progress") return "bg-amber-100 text-amber-700";
        return "bg-gray-100 text-gray-700";
    });

    const statusText = computed(() => {
        return props.ticket.status === "in_progress"
            ? "In Progress"
            : props.ticket.status;
    });

    const priorityClass = computed(() => {
        if (props.ticket.priority === "high") return "bg-green-100 text-green-700";
        if (props.ticket.priority === "medium") return "bg-amber-100 text-amber-700";
        return "bg-gray-100 text-gray-700";
    });
</script>
