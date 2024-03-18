import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { register } from "@/lib/api/register"
import { zodResolver } from "@hookform/resolvers/zod"
import { Loader2Icon } from "lucide-react"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import * as z from "zod"

const phoneRegex = new RegExp(
  /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
);

const formSignUpSchema = z.object({
  fullname: z.string()
    .min(3, { message: 'Name must be at least 3 characters.' })
    .max(30, { message: 'Name must be max 30 characters' }),
  username: z.string()
    .min(3, { message: 'Username must be at least 3 characters.' })
    .max(30, { message: 'Username must be max 30 characters' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  phoneNumber: z.string().regex(phoneRegex, {
    message: "Please enter a valid phone number",
  }),
  address: z.string(),
  newPassword: z.string({
    required_error: "New Password is required",
  })
    .min(3, { message: 'New Password must be at least 6 characters.' })
    .max(30, { message: 'New Password must be max 30 characters' }),
  confirmNewPassword: z.string({}),
})
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "Oops! Password does not match",
    path: ["confirmNewPassword"],
  })

export type SignUpFormValues = z.infer<typeof formSignUpSchema>

export default function UserRegisterFormCustomer() {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const navigate = useNavigate()

  const defaultValues: Partial<SignUpFormValues> = {
    username: "",
    email: "",
    fullname: "",
    phoneNumber: "",
    address: "",
    newPassword: "",
    confirmNewPassword: "",
  }

  const form = useForm<SignUpFormValues>({
    resolver: zodResolver(formSignUpSchema),
    defaultValues,
    mode: "onChange",
  })

  async function onSubmit(values: SignUpFormValues) {
    setIsLoading(true)
    const handleRegister = async () => {
      const data = await register({
        username: values.username,
        password: values.newPassword,
        fullname: values.fullname,
        phone: values.phoneNumber,
        address: values.address,
        email: values.email,
      })
      if (data) {
        toast.success("Account created successfully")
        setIsLoading(false)
        navigate("/admin-dashboard/customer")
      } else {
        toast.error("Failed to create account")
        setIsLoading(false)
      }
    }
    handleRegister()
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 justify-items-stretch">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="Your Username" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="fullname"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input placeholder="Your Full Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 justify-items-stretch">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Your Email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phoneNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <Input placeholder="Your Phone Number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div>
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Address</FormLabel>
                <FormControl>
                  <Input placeholder="Your Address" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 justify-items-stretch">
          <FormField
            control={form.control}
            name="newPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="Your Password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmNewPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="Confirm Password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button disabled={isLoading} type="submit" className="w-full hover:shadow-primary-md">
          {isLoading && (
            <Loader2Icon className="animate-spin" />
          )}
          Sign Up
        </Button>
      </form>
    </Form>
  )
}
