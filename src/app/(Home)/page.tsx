"use client";
import ChangeFormButtons from "./components/change-form-buttons";
import JoinMeetForm from "./components/join-meet-form";
import RegisterMeetForm from "./components/register-meet-form";
import useShowForm from "./hooks/useShowForm";

export default function HomePage() {
  const { showForm, handleShowFormClick } = useShowForm();

  return (
    <main className="flex w-full items-center justify-center p-3 md:p-5">
      <div className="flex w-full max-w-2xl flex-col rounded-lg border border-primary-3-dark/50 bg-primary-2-dark">
        <ChangeFormButtons
          showForm={showForm}
          handleShowFormClick={handleShowFormClick}
        />
        <div className="flex  px-4 py-4">
          {showForm === "join" && <JoinMeetForm />}
          {showForm === "register" && <RegisterMeetForm />}
        </div>
      </div>
    </main>
  );
}
