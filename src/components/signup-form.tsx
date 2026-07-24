import { cn } from "@/lib/utils"
import { Button } from "./ui/button"
import { Card, CardContent } from "./ui/card"
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "./ui/field"
import { Input } from "./ui/input"
import { Link } from "react-router-dom"
import * as z from "zod"
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect } from "react"
import { Spinner } from "./ui/spinner"
import Background1 from "./Background1"
import SmoothButton from "./smoothui/smooth-button"

const formSchema = z
  .object({
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/[0-9]/, "Password must contain at least one number")
      .regex(
        /[^A-Za-z0-9]/,
        "Password must contain at least one special character"
      )
      .regex(/^\S*$/, "Password cannot contain spaces"),

    confirmPassword: z.string(),
    email: z.email("Please enter a valid email address"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  })

export function SignupForm({
  onSubmit,
  isPending,
  className,
  mutateGoogle,
  ...props
}: React.ComponentProps<"div">) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "all",
    defaultValues: {
      password: "",
      confirmPassword: "",
      email: "",
    },
  })

  const password = form.watch("password")

  useEffect(() => {
    if (form.formState.touchedFields.confirmPassword) {
      form.trigger("confirmPassword")
    }
  }, [password])

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Background1 />

      <Card className="overflow-hidden bg-[#FBF7F5] p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form className="p-6 md:p-8" onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>
              <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-2xl font-bold">Create your account</h1>
                <p className="text-sm text-balance text-muted-foreground">
                  Enter your email below to create your account
                </p>
              </div>
              <Controller
                name="email"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="email">Email</FieldLabel>
                    <Input
                      disabled={isPending}
                      {...field}
                      aria-invalid={fieldState.invalid}
                      id="email"
                      placeholder="m@example.com"
                    />
                    <div className="min-h-[1.25rem]">
                      {!fieldState.invalid && (
                        <FieldDescription>
                          This email will be used to authenticate you.
                        </FieldDescription>
                      )}
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </div>
                  </Field>
                )}
              />

              <Field>
                <Field className="grid grid-cols-2 gap-4">
                  <Controller
                    name="password"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field aria-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="password">Password</FieldLabel>
                        <Input
                          disabled={isPending}

                          {...field}
                          id="password"
                          type="password"
                        />
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}

                        {!fieldState.invalid && (
                          <FieldDescription>
                            Must be at least 8 characters long.
                          </FieldDescription>
                        )}
                      </Field>
                    )}
                  />

                  <Field>
                    <Controller
                      name="confirmPassword"
                      control={form.control}
                      render={({ field, fieldState }) => (
                        <Field aria-invalid={fieldState.invalid}>
                          <FieldLabel htmlFor="confirm-password">
                            Confirm Password
                          </FieldLabel>
                          <Input
                            disabled={isPending}

                            {...field}
                            id="confirm-password"
                            type="password"
                          />
                          {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                          )}
                        </Field>
                      )}
                    />
                  </Field>
                </Field>
              </Field>
              <Field>
                <SmoothButton
                  disabled={isPending}
                  type="submit"
                  variant="outline"
                  className={`h-[4dvh] lg:h-[5dvh] ${isPending ? "pointer-events-none cursor-not-allowed" : ""}`}
                >
                  {isPending ? <Spinner size="5" /> : <></>}
                  Create Account
                </SmoothButton>
              </Field>
              <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card">
                Or continue with
              </FieldSeparator>
              <Field>
                <Button variant="outline" type="button" onClick={mutateGoogle}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path
                      d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                      fill="currentColor"
                    />
                  </svg>
                  <span className="sr-only">Sign up with Google</span>
                </Button>
              </Field>
              <FieldDescription className="text-center">
                Already have an account? <Link to="/signin">Sign in</Link>
              </FieldDescription>
            </FieldGroup>
          </form>

          <div className="relative hidden bg-muted md:block">
            <video
              autoPlay
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
              loop
            >
              <source
                src="https://elevate.heyacdn.com/elevate.com/public/data/main_banner_video/6862a0c48236c.mp4"
                type="video/mp4"
              />
            </video>
          </div>
        </CardContent>
      </Card>
      <FieldDescription className="px-6 text-center">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </FieldDescription>
    </div>
  )
}
