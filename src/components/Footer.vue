<template>
    <footer className="footer">
      <p>© {{ date }} TicketApp. All rights reserved.</p>
    </footer>
</template>

<script setup>
    const date = new Date().getFullYear()
</script>

<style scoped>
    .footer {
        text-align: center;
        padding: 2rem;
        background: #fff;
        font-size: 0.9rem;
        color: #6b7280;
        border-top: 1px solid #e5e7eb;
    }
</style>