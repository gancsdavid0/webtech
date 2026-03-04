import { z } from "zod";

export const RegisterSchema = z.object({
    email: z.string({ message: "Email megadása kötelező" }).email("Érvénytelen email formátum"),
    password: z.string({ message: "Jelszó megadása kötelező" })
                .min(6, "A jelszó legalább 6 karakter legyen")
                .regex(/[0-9]/, "A jelszónak tartalmaznia kell legalább egy számot"),
    fullName: z.string().min(2, "A név túl rövid"),
})

export const LogoutSchema = z.object({
    token: z.string().min(10, "Érvénytelen token formátum"),
});

export const LoginSchema = z.object({
    email: z.string({ message: "Email megadása kötelező" }).email(),
    password: z.string({ message: "Jelszó megadása kötelező" }),
});

export type RegisterDto = z.infer<typeof RegisterSchema>;
export type LogoutDTO = z.infer<typeof LogoutSchema>;
export type LoginDto = z.infer<typeof LoginSchema>;