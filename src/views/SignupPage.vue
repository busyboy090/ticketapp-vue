<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 max-sm:p-5">
    <div class="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
      <h2 class="text-2xl font-bold mb-4 text-center">Sign Up</h2>

      <form @submit.prevent="handleSubmit" class="space-y-4">
        <!-- Email -->
        <div>
          <label for="email">Email *</label>
          <input
            type="text"
            id="email"
            class="border rounded-lg w-full p-2"
            v-model="email"
            aria-describedby="email-error"
          />
          <p
            v-if="error.email.status"
            id="email-error"
            class="text-red-500 text-sm mt-1"
          >
            {{ error.email.message }}
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
              @click="showPassword = !showPassword"
            >
              <component
                :is="showPassword ? EyeOff : Eye"
                class="h-5 w-5 cursor-pointer"
              />
            </button>
          </div>

          <p
            v-if="error.password.status"
            id="password-error"
            class="text-red-500 text-sm mt-1"
          >
            {{ error.password.message }}
          </p>
        </div>

        <!-- Confirm Password -->
        <div>
          <label for="confirm">Confirm Password *</label>
          <div class="relative w-full">
            <input
              :type="showConfirmPassword ? 'text' : 'password'"
              id="confirm"
              class="border rounded-lg w-full p-2 pr-10"
              v-model="confirm"
              aria-describedby="confirm-error"
            />

            <button
              type="button"
              class="absolute right-2 top-[50%] translate-y-[-50%] text-gray-500 hover:text-gray-700"
              @click="showConfirmPassword = !showConfirmPassword"
            >
              <component
                :is="showConfirmPassword ? EyeOff : Eye"
                class="h-5 w-5 cursor-pointer"
              />
            </button>
          </div>

          <p
            v-if="error.confirm.status"
            id="confirm-error"
            class="text-red-500 text-sm mt-1"
          >
            {{ error.confirm.message }}
          </p>
        </div>

        <!-- Submit -->
        <button
          type="submit"
          class="bg-[#4f46e5] text-white w-full py-2 rounded-lg hover:bg-[#4e46e5e1]"
        >
          <Loader2 v-if="loading" class="animate-spin h-5 w-5 mx-auto" />
          <span v-else>Create Account</span>
        </button>

        <p class="text-center text-sm mt-3">
          Already have an account?
          <RouterLink to="/auth/login" class="text-blue-600">
            Login
          </RouterLink>
        </p>
      </form>
    </div>
  </div>
</template>

<script setup>
    import { ref } from "vue"
    import { useRouter } from "vue-router"
    import { Eye, EyeOff, Loader2 } from "lucide-vue-next"
    import { toast } from "vue3-toastify";
    import { signupUser } from "../services/authService.js"

    const email = ref("")
    const password = ref("")
    const confirm = ref("")
    const loading = ref(false)

    const error = ref({
      email: { status: false, message: "" },
      password: { status: false, message: "" },
      confirm: { status: false, message: "" },
    })

    const showPassword = ref(false)
    const showConfirmPassword = ref(false)
    const router = useRouter()

    const validateForm = () => {
      let valid = true

      const newError = {
        email: { status: false, message: "" },
        password: { status: false, message: "" },
        confirm: { status: false, message: "" },
      }

      if (!email.value) {
        valid = false
        newError.email = { status: true, message: "Email is required" }
      } else if (!/\S+@\S+\.\S+/.test(email.value)) {
        valid = false
        newError.email = { status: true, message: "Please enter a valid email address" }
      }

      if (!password.value) {
        valid = false
        newError.password = { status: true, message: "Password is required" }
      } else if (password.value.length < 6) {
        valid = false
        newError.password = { status: true, message: "Password must be at least 6 characters" }
      }

      if (!confirm.value) {
        valid = false
        newError.confirm = { status: true, message: "Confirmation password is required" }
      } else if (password.value !== confirm.value) {
        valid = false
        newError.confirm = { status: true, message: "Passwords do not match" }
      }

      error.value = newError
      return valid
    }

    const handleSubmit = async () => {
      if(loading.value) return

      if (!validateForm()) return

      loading.value = true

      try {
        await signupUser(email, password);
        toast.success("Signup successful!")
        setTimeout(() => router.push("/auth/login"), 1000)
      } catch (err) {
        toast.error("Signup failed")
      }finally {
        loading.value = false
      }
    }
</script>