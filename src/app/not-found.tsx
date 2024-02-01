import Button from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

const NotFoundPage = () => {
  return (
    <main className=" flex  w-full flex-1 flex-col items-center justify-center gap-3">
      <div className=" flex h-fit w-fit flex-col gap-3">
        <div className="flex h-80 w-64 items-center justify-center ">
          <Image
            src={
              "https://cdn.discordapp.com/attachments/1124406159328170034/1202329820047093792/mike_wazowski_meme_png_by_kylewithem_dg65n12-fullview.png?ex=65cd0fe7&is=65ba9ae7&hm=fe409f80df68b469396aaed0b88df0ea8b46fc6d18d8482e8c5238e493f10704&"
            }
            alt="Mike wazowski meme image"
            height={0}
            unoptimized
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
