"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { joinMeetFormSchema } from "../types/join-meet-types";
import Input from "@/components/ui/input";
import Button from "@/components/ui/button";
import Label from "@/components/ui/label";
import { useRouter } from "next/navigation";

type JoinMeetFormData = z.infer<typeof joinMeetFormSchema>;

const JoinMeetForm = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<JoinMeetFormData>({
    resolver: zodResolver(joinMeetFormSchema),
  });

  function randomNumberOneToTen() {
    return Math.floor(Math.random() * 10) + 1;
  }
  const colors = {
    "1": "red",
    "2": "green",
    "3": "blue",
    "4": "yellow",
    "5": "pink",
    "6": "cyan",
    "7": "orange",
    "8": "primary",
    "9": "violet",
    "10": "zinc",
  };
  const onSubmit = (data: JoinMeetFormData) => {
    const colorNumber = String(randomNumberOneToTen());
    const userColor = colors[colorNumber as keyof typeof colors];

    sessionStorage.setItem("username", data.name);
    sessionStorage.setItem("chatColor", userColor);

    //todo arrumar isso depois
    // router.push(`/room/${data.id}`);

    window.location.href = `/room/${data.id}`;

    return console.log(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex w-full flex-col items-center justify-center gap-3 bg-primary-2-dark "
    >
      <Label labelText="Nome:" error={!!errors.name} required>
        <Input
          {...register("name")}
          className="w-full rounded-lg bg-primary-2 py-1"
          placeholder="Seu nome"
          error={!!errors.name}
          errorMessage={errors.name?.message}
        />
      </Label>
      <Label labelText="ID:" error={!!errors.id} required>
        <Input
          {...register("id")}
          className="w-full rounded-lg bg-primary-2 py-1 "
          placeholder="ID da reunião"
          error={!!errors.id}
          errorMessage={errors.id?.message}
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
      <Button variant="button" type="submit" className="w-full ">
        Entrar
      </Button>
    </form>
  );
};

export default JoinMeetForm;
