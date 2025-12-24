"use client";
import updateProfile from "@/app/actions/user/update_profile/actions";
import MyInput from "@/components/Input/MyInput";
import SubmitButton from "@/components/SubmitButton/SubmitButton";
import { didFormChange } from "@/helpers/form_helpers";
import classNames from "classnames";
import { ChangeEvent, FC, useMemo, useState } from "react";
import AnimateHeight, { Height } from "react-animate-height";
import { mutate } from "swr";
import DeleteProfileButton from "../DeleteProfile/DeleteProfileButton";
import { useProfileContext } from "../ProfileContext";
import ProfileEmailField from "./ProfileEmailField";

const ProfileDetails: FC = () => {
  const { userData } = useProfileContext();

  const [updatedProfile, setUpdatedProfile] = useState(false);
  const [error, setError] = useState("");
  const [passEditHeight, setPassEditHeight] = useState<Height>(0);

  const [profileErrors, setProfileErrors] = useState<{
    firstname?: string[] | undefined;
    lastname?: string[] | undefined;
    email?: string[] | undefined;
    currentPassword?: string[] | undefined;
    newPassword?: string[] | undefined;
    confirmPassword?: string[] | undefined;
  }>();

  const [accountFormData, setAccountFormData] = useState({
    firstname: userData.firstname,
    lastname: userData.lastname,
    email: userData.email,
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const formChanged = useMemo(
    () => didFormChange(accountFormData, userData),
    [accountFormData, userData]
  );

  const handleInputAccount = (e: ChangeEvent<HTMLInputElement>) => {
    const fieldName = e.target.name;

    const passFields = ["currentPassword", "newPassword", "confirmPassword"];
    const fieldValue = passFields.includes(fieldName)
      ? e.target.value.replace(/\s/g, "")
      : e.target.value;

    setAccountFormData((prevState) => ({
      ...prevState,
      [fieldName]: fieldValue,
    }));

    setUpdatedProfile(false);
  };

  const handleInputEmail = (email: string) => {
    setAccountFormData((prevState) => ({
      ...prevState,
      email: email,
    }));

    setUpdatedProfile(false);
  };

  const submitFormAccount = async (formData: FormData) => {
    if (!formChanged) return;
    formData.append("email", accountFormData?.email ?? "");
    const update = await updateProfile(formData);
    setProfileErrors({});
    setError("");
    if (update?.errors) {
      return setProfileErrors(update.errors);
    }
    if (update.error) {
      return setError(update.error);
    }
    setUpdatedProfile(true);
    setPassEditHeight(0);
    setAccountFormData((prevState) => ({
      ...prevState,
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    }));
    await Promise.all([
      mutate("/api/user/"),
      mutate("/api/user/profile", {
        ...userData,
        firstname: accountFormData.firstname,
        lastname: accountFormData.lastname,
        email: accountFormData.email,
      }),
    ]);
  };

  return (
    <div className="w-full xl:w-[592px]">
      <div className="font-D24px-M18px font-bold">Profile details</div>
      <form action={submitFormAccount}>
        <div className="mt-[16px] flex flex-col gap-y-[16px]">
          <MyInput
            label="First Name"
            required={true}
            name="firstname"
            value={accountFormData.firstname}
            isError={!!profileErrors?.firstname}
            errorMessage={
              profileErrors?.firstname ? profileErrors?.firstname[0] : ""
            }
            onChange={handleInputAccount}
            containerClassName="w-full"
          />
          <MyInput
            label="Last Name"
            required={true}
            name="lastname"
            value={accountFormData.lastname}
            isError={!!profileErrors?.lastname}
            errorMessage={
              profileErrors?.lastname ? profileErrors?.lastname[0] : ""
            }
            onChange={handleInputAccount}
            containerClassName="w-full"
          />
          {/* <div>
            <MyInput
              label="Display name"
              required={true}
              name="displayname"
              value={accountFormData.displayname}
              isError={!!profileErrors?.displayname}
              errorMessage={
                profileErrors?.displayname ? profileErrors?.displayname[0] : ""
              }
              onChange={handleInputAccount}
              containerClassName="w-full"
            />
            <div className="font-13px-ALL mt-[16px] italic">
              This will be how your name will be displayed in the account
              section and in reviews.
            </div>
          </div> */}
          <div className="flex flex-col justify-between pt-[16px]">
            <div className="w-full">
              <div>
                <div className="font-D16px-M14px mb-[8px] font-bold">
                  Password
                </div>
                <div className="flex items-center justify-between">
                  <div className="">**********</div>
                  <button
                    type="button"
                    onClick={() => {
                      setPassEditHeight(passEditHeight === 0 ? "auto" : 0);
                    }}
                    className="font-13px-ALL cursor-pointer underline transition duration-300 hover:text-[#E7461E]"
                    aria-expanded={passEditHeight !== 0}
                  >
                    edit
                  </button>
                </div>
                <AnimateHeight height={passEditHeight} duration={300}>
                  <div className="mt-[32px] flex w-full flex-col gap-[16px]">
                    <h3 className="font-D16px-M14px font-bold">
                      Password Change
                    </h3>
                    <MyInput
                      label="Current password"
                      name="currentPassword"
                      required={false}
                      value={accountFormData.currentPassword}
                      isError={!!profileErrors?.currentPassword}
                      errorMessage={
                        profileErrors?.currentPassword
                          ? profileErrors?.currentPassword[0]
                          : ""
                      }
                      type="password"
                      containerClassName="w"
                      onChange={handleInputAccount}
                    />
                    <MyInput
                      label="New password"
                      name="newPassword"
                      required={false}
                      value={accountFormData.newPassword}
                      isError={!!profileErrors?.newPassword}
                      errorMessage={
                        profileErrors?.newPassword
                          ? profileErrors?.newPassword[0]
                          : ""
                      }
                      type="password"
                      containerClassName="w-full"
                      onChange={handleInputAccount}
                    />
                    <MyInput
                      label="Confirm new password"
                      name="confirmPassword"
                      required={false}
                      value={accountFormData.confirmPassword}
                      isError={!!profileErrors?.confirmPassword}
                      errorMessage={
                        profileErrors?.confirmPassword
                          ? profileErrors?.confirmPassword[0]
                          : ""
                      }
                      type="password"
                      containerClassName="w-full"
                      onChange={handleInputAccount}
                    />
                    {error && (
                      <div className="font-D16px-M14px mb-[24px] flex items-center gap-[8px] rounded-[5px] bg-warningRed p-[16px]">
                        {error}
                      </div>
                    )}
                  </div>
                </AnimateHeight>
              </div>
            </div>
            <ProfileEmailField
              initialEmail={userData?.email}
              handleInputEmail={handleInputEmail}
            />
            <div className="mb-[16px] mt-[32px] flex items-center justify-start gap-4 sm:flex-col-reverse sm:items-start">
              <DeleteProfileButton />
              {!updatedProfile ? (
                <SubmitButton
                  text="SAVE"
                  highlighted={true}
                  reverseColors
                  showSpiner
                  customClass={classNames(
                    "w-full font-16px-ALL ml-auto max-w-[178px] sm:max-w-full",
                    !formChanged && "!bg-lightgray !text-gray2 !border-none"
                  )}
                  disabled={!formChanged}
                />
              ) : (
                <div className="font-D16px-M14px font-bold text-[#E7461E] sm:max-w-[236px] sm:text-center">
                  Profile updated successfully!
                </div>
              )}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ProfileDetails;
