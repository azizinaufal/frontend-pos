<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useUser } from '@/stores/user';
import { handleErrors } from "@/utils/handleErrors";
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'


const props = defineProps<{
  class?: HTMLAttributes['class']
}>()


const router = useRouter();
const userStore = useUser();
const email = ref("");
const password = ref("");
const errors = ref<{ email?: string; password?: string }>({});
const loginFailed = ref('');



const loginHandler = async () => {
  try {
 await userStore.login({ email: email.value, password: password.value })
    await router.push("/dashboard");


  } catch (error) {
    console.log("error client:",error)
    if (error.response?.data?.message) {
      loginFailed.value = error.response.data.message;
      return;
    }

    handleErrors(error.response?.data, errors);
  }
};
</script>

<template>


        <div :class="cn('flex flex-col gap-6', props.class)">
          <Card class="overflow-hidden p-0">
            <CardContent class="grid p-0 md:grid-cols-2">
              <div v-if="loginFailed" class="col-span-2 bg-red-100 text-red-700 p-3 rounded mb-4 text-sm">
                {{ loginFailed }}
              </div>

              <form @submit.prevent="loginHandler" class="p-6 md:p-8">
                <div class="flex flex-col gap-6">
                  <div class="flex flex-col items-center text-center">
                    <h1 class="text-2xl font-bold">
                      Welcome back
                    </h1>
                    <p class="text-muted-foreground text-balance">
                      Login to your Acme Inc account
                    </p>
                  </div>
                  <div class="grid gap-3">
                    <Label for="email">Email</Label>
                    <Input v-model="email" id="email" type="email" placeholder="m@example.com"/>
                    <div v-if="errors.email" class="text-red-600 text-sm mt-1">
                      {{ errors.email }}
                    </div>
                  </div>
                  <div class="grid gap-3">
                    <div class="flex items-center">
                      <Label for="password">Password</Label>
                      <a href="#" class="ml-auto text-sm underline-offset-2 hover:underline">Forgot your password?</a>
                    </div>
                    <Input id="password" type="password" v-model="password" />
                    <div v-if="errors.password" class="text-red-600 text-sm mt-1">
                      {{ errors.password }}
                    </div>
                  </div>
                  <Button type="submit" class="w-full cursor-pointer">
                    Login
                  </Button>
                  <div class="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
              <span class="bg-card text-muted-foreground relative z-10 px-2">
                Or continue with
              </span>
                  </div>

                  <div class="text-center text-sm">
                    Don't have an account?
                    <a href="#" class="underline underline-offset-4">
                      Sign up
                    </a>
                  </div>
                </div>
              </form>
              <div class="bg-muted relative hidden md:block">
                <img
                    src="@/assets/vue.svg"
                    alt="Image"
                    class="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
                >
              </div>
            </CardContent>
          </Card>
          <div class="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
            By clicking continue, you agree to our <a href="#">Terms of Service</a>
            and <a href="#">Privacy Policy</a>.
          </div>
        </div>

</template>
