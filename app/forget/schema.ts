import { z } from "zod";

export const formSchema = z.object({
  email: z.string().email("Please enter a valid email address."),
});

export const resetFormSchema = z.object({
  password: z
    .string({ required_error: "Please fill in this field." })
    .min(8, { message: "Must be a minimum of 8 characters." })
    .regex(/[!@#$%^&*(),.?":{}|<>]/, {
      message: "Password must contain at least one special character.",
    }),
  confirmPassword: z
    .string({ required_error: "Please fill in this field." })
    .min(8, { message: "Must be a minimum of 8 characters." }),
});
