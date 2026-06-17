import { z } from 'zod';

export const MIN_USERNAME_LENGTH = 3;

export const loginSchema = z.object({
  username: z
    .string()
    .min(MIN_USERNAME_LENGTH, `Username must be at least ${MIN_USERNAME_LENGTH} characters`),
  password: z.string().trim().min(1, 'Password is required'),
});

export type ILoginFormValues = z.infer<typeof loginSchema>;

export const LOGIN_FORM_DEFAULT_VALUES: ILoginFormValues = {
  username: '',
  password: '',
};
