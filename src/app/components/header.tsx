import Image from "next/image";

const Header = () => {
  return (
    <header className="flex w-full border-b border-primary-3-dark bg-primary-2 px-3 py-1 md:px-5">
      <div className="flex w-full items-center gap-3">
        <Image
          src={"/logo"}
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
