"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { joinMeetFormSchema } from "../types/join-meet-types";
import Input from "@/app/components/ui/input";
import Button from "@/app/components/ui/button";
import Label from "@/app/components/ui/label";

const JoinMeetForm = () => {
  type JoinMeetFormData = z.infer<typeof joinMeetFormSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<JoinMeetFormData>({
    resolver: zodResolver(joinMeetFormSchema),
  });

  const onSubmit = (data: JoinMeetFormData) => {
    return console.log(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex w-full flex-col items-center  justify-center gap-3 bg-primary-2-dark "
    >
      <Label labelText="ID:" error={!!errors.id} required>
        <Input
          {...register("id")}
          className="w-full rounded-lg bg-primary-2 py-1 "
          placeholder="ID da reunião"
          error={!!errors.id}
          errorMessage={errors.id?.message}
        />
      </Label>
      <Label labelText="Nome:" error={!!errors.name} required>
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

      <p className="flex w-full gap-1 text-sm">
        Campos com <span className="font-medium text-red-500">*</span> são
        obrigatórios
      </p>
      <Button variant="button" type="submit" className="w-fit ">
        Entrar
      </Button>
    </form>
  );
};

export default JoinMeetForm;
