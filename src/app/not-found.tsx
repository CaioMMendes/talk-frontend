import Button from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

const NotFoundPage = () => {
  return (
    <main className=" flex  w-full flex-1 flex-col items-center justify-center gap-3">
      <div className=" flex h-fit w-fit flex-col gap-3">
        <div className="flex h-80 w-64 items-center justify-center ">
          <Image
            src={"/page-not-found.png"}
            alt="Brigada-online logo"
            height={0}
            width={0}
            className="h-auto w-full"
            sizes="100vw"
            style={{
              objectFit: "contain",
            }}
          />
        </div>

        <p className="flex w-full items-center justify-center text-xl font-semibold">
          Pagina não encontrada
        </p>
        <Button variant="button" className="text-base">
          <Link href={"/"}>Voltar ao início</Link>
        </Button>
      </div>
    </main>
  );
};

export default NotFoundPage;
