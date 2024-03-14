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
import axios from "axios"
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
  name: z.string()
    .min(3, { message: 'Name must be at least 3 characters.' })
    .max(30, { message: 'Name must be max 30 characters' }),
  username: z.string()
    .min(3, { message: 'Username must be at least 3 characters.' })
    .max(30, { message: 'Username must be max 30 characters' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  phoneNumber: z.string().regex(phoneRegex, {
    message: "Please enter a valid phone number",
  }),
  newPassword: z.string({
    required_error: "New Password is required",
  })
    .min(3, { message: 'New Password must be at least 6 characters.' })
    .max(30, { message: 'New Password must be max 30 characters' }),
})


export type SignUpFormValues = z.infer<typeof formSignUpSchema>

export default function UserRegisterForm() {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const navigate = useNavigate()

  const defaultValues: Partial<SignUpFormValues> = {
    username: "",
    email: "",
    phoneNumber: "",
    name: "",
    newPassword: "",
  }

  const form = useForm<SignUpFormValues>({
    resolver: zodResolver(formSignUpSchema),
    defaultValues,
    mode: "onChange",
  })

  async function onSubmit(values: SignUpFormValues) {
    setIsLoading(true)
    const handleRegister = async () => {
      axios.post("http://localhost:4000/api/agency", {
        Username: values.username,
        Password: values.newPassword,
        Name: values.name,
        Email: values.email,
        PhoneNumber: values.phoneNumber,
      })
      .then(res => {
        if (res.data) {
          toast.success("Agency created successfully")
          setIsLoading(false)
          navigate("/admin-dashboard/agency")
        } else {
          toast.error("Failed to create account")
          setIsLoading(false)
        }
      })
      .catch(error => {
        toast.error("Failed to create account: "+ error?.response?.data?.message)
        setIsLoading(false)
      })
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
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Your Name" {...field} />
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
        </div>
        <Button disabled={isLoading} type="submit" className="w-full hover:shadow-primary-md">
          {isLoading && (
            <Loader2Icon className="animate-spin" />
          )}
          Create Agency
        </Button>
      </form>
    </Form>
  )
}
