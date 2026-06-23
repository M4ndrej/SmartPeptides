"use client";
import Input from "@/components/Input/Input";
import SubmitButton from "@/components/SubmitButton/SubmitButton";
import { ChangeEvent, FC, useRef, useState } from "react";

interface ReferralUrlFormProps {
  affiliateIdURL?: string;
}

const ReferralUrlForm: FC<ReferralUrlFormProps> = ({ affiliateIdURL }) => {
  const idUrl = "asjdkasjdks";

  const submitButton = useRef<HTMLButtonElement>(null);
  const [error, setError] = useState("");
  const [linkError, setLinkError] = useState<string[] | undefined>();
  const [link, setLink] = useState("");

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const prefix = "https://smartpeptides.com/";
    const inputVal = e.target.value;

    if (inputVal === prefix) {
      return setLink("");
    }
    const input = e.target.value.replace(`${prefix}/`, "");
    setLink(input);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      submitButton.current?.click();
    }
  };

  const handleGenerateUrl = async (formData: FormData) => {
    // const generate = await generateUrl(formData);
    // setError("");
    // if (generate?.errors) {
    //   return setLinkError(generate.errors);
    // }
    // if (generate?.error) {
    //   return setError(generate.error);
    // }
    // await mutate("/api/user/");
    // await mutate("/api/user/profile");
    // await mutate("/api/affiliate");
  };

  return (
    <form action={handleGenerateUrl} className="mb-10 w-full">
      {/* Input fields */}
      <div className="flex w-full gap-4 sm:flex-col">
        <div className="w-full grow">
          <label className="font-D16px-M13px mb-2 block font-bold">
            Your Refferal Link Using Affiliate ID
          </label>
          <Input
            label="ID Link"
            name="id_link"
            required={true}
            customClass="w-full"
            parentCustomClass="w-full"
            value={affiliateIdURL}
            disabled={true}
          />
        </div>
        <div className="w-full grow">
          <label className="font-D16px-M13px mb-2 block font-bold">
            Referral URL Generator
          </label>
          <Input
            label="Link"
            name="link"
            required={true}
            customClass="w-full"
            parentCustomClass="w-full"
            value={`https://smartpeptides.com//${link}`}
            onChange={handleInputChange}
            onKeyDown={handleKeyPress}
            errorInput={!!linkError}
            customErrorText={linkError ? linkError[0] : ""}
          />
        </div>
      </div>
      <div className="flex items-center justify-center pt-6">
        {error && (
          <div className="font-D16px-M13px mb-6 flex items-center gap-[8px] rounded-[5px] bg-warningRed p-[16px] sm:leading-[16px]">
            {error}
          </div>
        )}
        <SubmitButton
          ref={submitButton}
          highlighted={true}
          customClass="w-full max-w-[332px] font-D16px-M15px !mx-auto"
          showSpiner
          reverseColors
          text="GENERATE REFERRAL URL"
        />
      </div>
    </form>
  );
};

export default ReferralUrlForm;
