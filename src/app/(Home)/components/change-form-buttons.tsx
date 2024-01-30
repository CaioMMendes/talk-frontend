import Button from "@/components/ui/button";

interface ChangeFormButtonsProps {
  showForm: string;
  handleShowFormClick: (formName: "register" | "join") => void;
}

const ChangeFormButtons = ({
  showForm,
  handleShowFormClick,
}: ChangeFormButtonsProps) => {
  return (
    <div className="flex w-full justify-between">
      <div
        className={`${showForm === "join" && "bg-primary-1"} flex w-full rounded-tl-lg `}
      >
        <Button
          className={`flex w-full items-center justify-center rounded-tl-lg px-2 py-1 ${showForm === "join" ? "!cursor-default rounded-tr-lg bg-primary-2-dark" : "rounded-br-lg bg-primary-1"}`}
          onClick={() => handleShowFormClick("join")}
        >
          Ingressar
        </Button>
      </div>
      <div
        className={`${showForm === "register" && "bg-primary-1"} flex w-full rounded-tr-lg `}
      >
        <Button
          className={`flex w-full items-center justify-center rounded-tr-lg px-2 py-1  ${showForm === "register" ? "!cursor-default rounded-tl-lg bg-primary-2-dark" : "rounded-bl-lg bg-primary-1"}`}
          onClick={() => handleShowFormClick("register")}
        >
          Nova Reunião
        </Button>
      </div>
    </div>
  );
};

export default ChangeFormButtons;
