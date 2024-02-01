import Image from "next/image";

const Header = () => {
  return (
    <header className="flex w-full border-b border-primary-3-dark bg-primary-2 px-3 py-1 md:px-5">
      <div className="flex w-full items-center gap-3">
        <Image
          src={
            "https://cdn.discordapp.com/attachments/1124406159328170034/1202707931833958430/logo.png?ex=65ce700c&is=65bbfb0c&hm=74d259604fcb219568bc441e9b766f18e8c0ffbe54a793c3f9058233e981089a&"
          }
          unoptimized
          height={45}
          width={45}
          alt="Project logo"
        />
        <h2 className="text-lg font-medium ">Talk</h2>
      </div>
    </header>
  );
};

export default Header;
