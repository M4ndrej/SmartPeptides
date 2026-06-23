import updateUserPassword from "@/app/actions/user/update-password/actions";
import Input from "@/components/Input/Input";
import SubmitButton from "@/components/SubmitButton/SubmitButton";
import { ChangeEvent, useState } from "react";
import AnimateHeight, { Height } from "react-animate-height";
import { mutate } from "swr";

const UpdatePassword = () => {
  const [error, setError] = useState("");
  const [updatedProfile, setUpdatedProfile] = useState(false);
  const [passEditHeight, setPassEditHeight] = useState<Height>(0);
  const [passwordErrors, setPasswordErrors] = useState<{
    currentPassword?: string[] | undefined;
    newPassword?: string[] | undefined;
    confirmPassword?: string[] | undefined;
  }>();

  const [editPasswordFormData, setEditPasswordFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleInputPassword = (e: ChangeEvent<HTMLInputElement>) => {
    const fieldName = e.target.name;
    const fieldValue = e.target.value;
    setUpdatedProfile(false);

    setEditPasswordFormData((prevState) => ({
      ...prevState,
      [fieldName]: fieldValue,
    }));
  };

  const submitFormPassword = async (formData: FormData) => {
    const updatePassword = await updateUserPassword(formData);
    setPasswordErrors({});
    setError("");

    if (updatePassword?.errors) {
      setPasswordErrors(updatePassword.errors);
    } else if (!updatePassword?.error) {
      setUpdatedProfile(true);
      setEditPasswordFormData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      mutate("/api/user/");
    } else {
      setError(updatePassword.error);
    }
  };

  return (
    <div className="w-[100%] xl:w-[592px]">
      <div>
        <div className="font-D16px-M14px mb-[8px] font-bold">Password</div>
        <div className="flex items-center justify-between">
          <div>**********</div>
          <button
            onClick={() => {
              setPassEditHeight(passEditHeight === 0 ? "auto" : 0);
            }}
            className="font-13px-ALL cursor-pointer underline transition duration-300 hover:text-[#333333]"
            aria-expanded={passEditHeight !== 0}
          >
            edit
          </button>
        </div>
        <AnimateHeight height={passEditHeight} duration={300}>
          <form action={submitFormPassword}>
            <div className="mt-[32px] flex w-full flex-col gap-[16px]">
              <h3 className="font-D16px-M14px font-bold">Password Change</h3>
              <Input
                label="Current password"
                name="currentPassword"
                required={true}
                value={editPasswordFormData.currentPassword}
                errorInput={!!passwordErrors?.currentPassword}
                customErrorText={
                  passwordErrors?.currentPassword
                    ? passwordErrors?.currentPassword[0]
                    : ""
                }
                type="password"
                customClass="w-[100%] h-[44px] "
                onChange={handleInputPassword}
              />
              <Input
                label="New password"
                name="newPassword"
                required={true}
                value={editPasswordFormData.newPassword}
                errorInput={!!passwordErrors?.newPassword}
                customErrorText={
                  passwordErrors?.newPassword
                    ? passwordErrors?.newPassword[0]
                    : ""
                }
                type="password"
                customClass="w-[100%] h-[44px]"
                onChange={handleInputPassword}
              />
              <Input
                label="Confirm new password"
                name="confirmPassword"
                required={true}
                value={editPasswordFormData.confirmPassword}
                errorInput={!!passwordErrors?.confirmPassword}
                customErrorText={
                  passwordErrors?.confirmPassword
                    ? passwordErrors?.confirmPassword[0]
                    : ""
                }
                type="password"
                customClass="w-[100%] h-[44px]"
                onChange={handleInputPassword}
              />
              {error && (
                <div className="font-D16px-M14px mb-[24px] flex items-center gap-[8px] rounded-[5px] bg-warningRed p-[16px]">
                  {error}
                </div>
              )}
              <div className="flex w-full justify-end">
                {!updatedProfile ? (
                  <SubmitButton
                    text="SAVE CHANGES"
                    highlighted={true}
                    customClass="w-[100%] font-16px-ALL lg:w-fit"
                    reverseColors
                    disabled={
                      !editPasswordFormData.currentPassword ||
                      !editPasswordFormData.newPassword ||
                      !editPasswordFormData.confirmPassword
                    }
                    showSpiner
                  />
                ) : (
                  <div className="font-bold text-[#333333] sm:max-w-[236px] sm:text-center sm:text-[14px] sm:leading-[20px]">
                    Profile password updated successfully!
                  </div>
                )}
              </div>
            </div>
          </form>
        </AnimateHeight>
      </div>
    </div>
  );
};

export default UpdatePassword;
