import { z } from "zod";

export const chatFormSchema = z.object({
  message: z
    .string({ invalid_type_error: "O valor precisa ser uma string" })
    .trim()
    .max(200, "Você ultrapassou o limite de 200 caracteres"),
});
