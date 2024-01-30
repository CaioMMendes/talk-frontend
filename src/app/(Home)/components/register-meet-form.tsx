"use client";

import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import Label from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { registerMeetFormSchema } from "../types/register-meet-types";

const RegisterMeetForm = () => {
  type RegisterMeetFormData = z.infer<typeof registerMeetFormSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterMeetFormData>({
    resolver: zodResolver(registerMeetFormSchema),
  });

  const onSubmit = (data: RegisterMeetFormData) => {
    return console.log(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex w-full flex-col items-center  justify-center gap-3 bg-primary-2-dark "
    >
      <Label labelText="Nome:" required error={!!errors.name}>
        <Input
          {...register("name")}
          className="w-full rounded-lg bg-primary-2 py-1"
          placeholder="Seu nome"
          error={!!errors.name}
          errorMessage={errors.name?.message}
        />
      </Label>
      <Label labelText="Senha:" error={!!errors.password}>
        <Input
          {...register("password")}
          type="password"
          className="w-full rounded-lg bg-primary-2 py-1"
          placeholder="Senha da reunião"
          error={!!errors.password}
          errorMessage={errors.password?.message}
        />
      </Label>
      <Label labelText="Confirmar senha:" error={!!errors.confirmPassword}>
        <Input
          {...register("confirmPassword")}
          type="password"
          className="w-full rounded-lg bg-primary-2 py-1"
          placeholder="Senha da reunião"
          error={!!errors.confirmPassword}
          errorMessage={errors.confirmPassword?.message}
        />
      </Label>
      <p className="flex w-full gap-1 text-sm">
        Campos com <span className="font-medium text-red-500">*</span> são
        obrigatórios
      </p>
      <Button variant="button" type="submit" className="w-full ">
        Entrar
      </Button>
    </form>
  );
};

export default RegisterMeetForm;
