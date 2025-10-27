<template>
  <header class="header relative">
    <div>
      <h2 class="logo">🎟️ TicketApp</h2>

      <!-- Toggle Menu -->
      <button class="menu-btn lg:hidden" @click="isMenuOpen = !isMenuOpen">
        <Menu />
      </button>

      <!-- Navigation -->
      <nav
        :class="[
          isMenuOpen ? 'max-lg:block' : 'max-lg:hidden',
          'max-lg:h-[150px] max-lg:absolute max-lg:top-15 max-lg:bg-white max-lg:w-full max-lg:translate-x-[-50%] max-lg:left-[50%] lg:block',
        ]"
      >
        <ul
          class="flex max-lg:flex-col justify-center lg:justify-end items-center h-full gap-6"
        >
          <li>
            <RouterLink to="/auth/login" class="nav-btn">Login</RouterLink>
          </li>
          <li>
            <RouterLink to="/auth/signup" class="nav-btn primary"
              >Get Started</RouterLink
            >
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<script setup>
  import { ref } from "vue";
  import { Menu } from "lucide-vue-next";

  const isMenuOpen = ref(false);
</script>

<style scoped>
  /* Header */
  .header {
    background: #fff;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
    position: sticky;
    top: 0;
    z-index: 10;
  }

  .header div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 2rem;
  }
  .logo {
    font-weight: 700;
    font-size: 1.3rem;
  }
  .nav-btn {
    margin-left: 1rem;
    text-decoration: none;
    color: #4f46e5;
    font-weight: 500;
  }
  .nav-btn.primary {
    background: #4f46e5;
    color: white;
    padding: 0.5rem 1rem;
    border-radius: 8px;
  }
</style>