const Footer = () => {
  return (
    <footer className="flex w-full items-center justify-center gap-2 border-t border-primary-3-dark bg-primary-2 px-5 py-1.5 text-xs md:text-sm">
      &copy; {new Date().getFullYear()} | Caio Martins
    </footer>
  );
};

export default Footer;
