import { z } from "zod";

export const registerMeetFormSchema = z
  .object({
    name: z
      .string({ invalid_type_error: "O valor precisa ser uma string" })
      .trim()
      .min(1, "Digite um nome válido")
      .max(200, "Você ultrapassou o limite de 200 caracteres"),
    password: z
      .union([
        z.string().trim().length(0, "Remova os espaços em branco"),
        z
          .string({ invalid_type_error: "O valor precisa ser uma string" })
          .trim()
          .min(1, "Digite uma senha válida")
          .max(50, "Você ultrapassou o limite de 50 caracteres"),
      ])
      .optional()
      .transform((e) => (e === "" ? undefined : e)),
    confirmPassword: z
      .union([
        z.string().trim().length(0, "Remova os espaços em branco"),
        z
          .string({ invalid_type_error: "O valor precisa ser uma string" })
          .trim()
          .min(1, "Digite uma senha válida")
          .max(50, "Você ultrapassou o limite de 50 caracteres"),
      ])
      .optional()
      .transform((e) => (e === "" ? undefined : e)),
  })
  .refine(
    (values) => {
      return values.password === values.confirmPassword;
    },
    {
      message: "Passwords must match!",
      path: ["confirmPassword"],
    },
  );
