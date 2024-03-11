"use client"

import * as React from "react"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"

import { cn } from "@/lib/utils"
import { zodResolver } from "@hookform/resolvers/zod"
import { Loader2 } from "lucide-react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { login } from "@/lib/api/login"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"
import { useAppDispatch } from "@/hooks/useStore"
import { loginSlice } from "@/store/auth/loginUserSlice"
import { set } from "date-fns"

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> { }

const formLoginSchema = z.object({
  userName: z.string(),
  password: z.string().min(3, {
    message: "Password must be at least 3 characters long",
  }),
})

export function UserLoginForm({ className, ...props }: UserAuthFormProps) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  // 1. Define your form.
  const form = useForm<z.infer<typeof formLoginSchema>>({
    resolver: zodResolver(formLoginSchema),
    defaultValues: {
      userName: "",
      password: "",
    },
  })

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formLoginSchema>) {
    setIsLoading(true)
    const res = await login(values.userName, values.password)
      .then((res) => {
        setIsLoading(false)
        console.log(res)
        dispatch(loginSlice(res))
        setTimeout(() => {
          if (res?.user?.Role === "agency") {
            navigate("/dashboard")
          } else if (res?.user?.Role === "investor" || res?.user?.Role === "admin") {
            navigate("/admin-dashboard")
          } else {
            navigate("/")
          }
        }, 1000)

      })
  }

  return (
    <div className={cn("grid gap-6 space-y-4", className)} {...props}>
      <Form {...form}>
        <form method="POST" onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
          <FormField
            control={form.control}
            name="userName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>User name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button disabled={isLoading} className="w-full">
            {isLoading && (
              <Loader2 className="animate-spin" />
            )}
            Login with Email
          </Button>
        </form>
      </Form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
      </div>
    </div>
  )
}