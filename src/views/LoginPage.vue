<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 max-sm:p-5">
    <div class="bg-white rounded-xl shadow-md w-full max-w-md p-6">
      <h2 class="text-2xl font-bold mb-4 text-center">Login</h2>

      <form @submit.prevent="handleSubmit" class="space-y-4">
        <!-- Email -->
        <div>
          <label>Email *</label>
          <input
            type="email"
            class="border rounded-lg w-full p-2 pr-10"
            v-model="email"
            aria-describedby="email-error"
          />
          <p v-if="error && !email" id="email-error" class="text-red-500 text-sm mt-1">
            Email is required
          </p>
        </div>

        <!-- Password -->
        <div>
          <label for="password">Password *</label>
          <div class="relative w-full">
            <input
              :type="showPassword ? 'text' : 'password'"
              id="password"
              class="border rounded-lg w-full p-2 pr-10"
              v-model="password"
              aria-describedby="password-error"
            />

            <button
              type="button"
              class="absolute right-2 top-[50%] translate-y-[-50%] text-gray-500 hover:text-gray-700"
              @click="togglePassword"
            >
              <component :is="showPassword ? EyeOff : Eye" class="h-5 w-5 cursor-pointer" />
            </button>
          </div>

          <p v-if="error && !password" id="password-error" class="text-red-500 text-sm mt-1">
            Password is required
          </p>
        </div>

        <!-- Submit -->
        <button
          type="submit"
          class="bg-[#4f46e5] text-white w-full py-2 rounded-lg hover:bg-[#4e46e5e1]"
        >
          <Loader2 v-if="loading" class="animate-spin h-5 w-5 mx-auto" />
          <span v-else>Login</span>
        </button>

        <!-- Link -->
        <p class="text-center text-sm mt-3">
          Don’t have an account?
          <RouterLink to="/auth/signup" class="text-[#4f46e5]">Sign up</RouterLink>
        </p>
      </form>
    </div>
  </div>
</template>

<script setup>
    import { ref } from "vue";
    import { useRouter } from "vue-router";
    import { EyeOff, Eye, Loader2 } from "lucide-vue-next";
    import { toast } from "vue3-toastify";
    import { loginUser } from "@/services/authService";

    const email = ref("");
    const password = ref("");
    const error = ref(false);
    const showPassword = ref(false);
    const loading = ref(false)

    const router = useRouter();

    const togglePassword = () => {
      showPassword.value = !showPassword.value;
    };

    const handleSubmit = async () => {
      if(loading.value) {
        return 
      }
      
      if (!email.value || !password.value) {
        error.value = true;
        toast.error("All fields are required");
        return;
      }

      loading.value = true

      try {
        await loginUser(email.value, password.value);
        toast.success("Login successful");
        setTimeout(() => router.push("/dashboard"), 1000);
      } catch (err) {
        toast.error(err.message || "Login failed");
      } finally {
        loading.value = false
      }
    };
</script>
