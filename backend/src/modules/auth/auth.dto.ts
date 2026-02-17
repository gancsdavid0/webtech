import { z } from "zod";

export const RegisterSchema = z.object({
    email: z.string({ message: "Email megadása kötelező" }).email("Érvénytelen email formátum"),
    password: z.string({ message: "Jelszó megadása kötelező" }).min(6, "A jelszó legalább 6 karakter legyen"),
    fullName: z.string({ message: "Név megadása kötelező" }),
})

export const LoginSchema = z.object({
    email: z.string({ message: "Email megadása kötelező" }).email(),
    password: z.string({ message: "Jelszó megadása kötelező" }),
});

export type RegisterDto = z.infer<typeof RegisterSchema>;
export type LoginDto = z.infer<typeof LoginSchema>;