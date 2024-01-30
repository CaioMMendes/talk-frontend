"use-client";

import Button from "@/components/ui/button";

interface IControlButton {
  state: boolean;
  IconOn: React.ElementType;
  IconOff?: React.ElementType;
  onClick?: () => void;
  titleOn?: string;
  titleOff?: string;
}

const ControlButton = ({
  state,
  IconOn,
  IconOff,
  onClick,
  titleOn,
  titleOff,
}: IControlButton) => {
  return (
    <Button
      variant="button"
      title={state ? titleOn : titleOff}
      onClick={onClick}
    >
      {state ? (
        <IconOn width={24} height={24} />
      ) : (
        IconOff && <IconOff width={24} height={24} />
      )}
    </Button>
  );
};

export default ControlButton;
