"use client";

import sendContactUsFormAction, {
  ContactUsValidationErros,
} from "@/app/actions/contactus/actions";
import Image from "next/image";
import { ChangeEvent, FC, useState } from "react";
import MyInput from "../Input/MyInput";
import MyTextArea from "../Input/MyTextArea";
import SubmitButton from "../SubmitButton/SubmitButton";

const ContactPage: FC = () => {
  const [contactMessageSent, setContactMessageSent] = useState(false);
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    message: "",
    username: "",
  });

  const [contactFormErrors, setContactFormErrors] =
    useState<ContactUsValidationErros>();

  const handleInput = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
  ) => {
    const fieldName = e.target.name;
    const fieldValue = e.target.value;

    setContactFormErrors({
      ...contactFormErrors,
      [fieldName]: undefined,
    });

    setFormData((prevState) => ({
      ...prevState,
      [fieldName]: fieldValue,
    }));
  };

  const sendContactFormAction = async (formData: FormData) => {
    const contactResponse = await sendContactUsFormAction(formData);

    if (contactResponse?.errors) {
      setContactFormErrors(contactResponse?.errors);
      return;
    }

    setContactMessageSent(true);
  };

  return (
    <div className="mb-[64px] mt-[48px] w-[100%]">
      <div className="container-padding-inline m-[auto] flex w-[100%] max-w-[1264px] justify-between sm:max-w-[100vw] md:max-w-[100vw] md:flex-col lg:flex-row lg:items-center">
        <div className="lg:max-w-[488px] xl:max-w-[592px]">
          <h1 className="font-D32px-M24px pb-[16px] font-bold">Need Help?</h1>
          <div className="mb-[16px] h-[2px] w-[48px] bg-[#E7461E]"></div>
          <div className="font-D16px-M13px pb-[40px] sm:pb-[16px]">
            You can contact our team at{" "}
            <span className="font-bold">support@valuepeptide.com</span>, or send
            us a message through the form below.
          </div>
          {contactMessageSent ? (
            <div className="font-D16px-M13px font-bold text-[#E7461E] sm:max-w-[236px] sm:text-center">
              Thanks for contacting us! We will be in touch with you shortly.
            </div>
          ) : (
            <form action={sendContactFormAction} noValidate>
              <div className="personal_inputs flex sm:flex-col md:gap-[16px]">
                <MyInput
                  label="Username"
                  required={true}
                  name="username"
                  value={formData.username}
                  onChange={handleInput}
                  containerClassName="w-full"
                />
              </div>
              <div className="mb-4 flex flex-col gap-4 md:flex-row md:gap-4 xl:flex-row">
                <MyInput
                  label="First Name"
                  required={true}
                  name="firstname"
                  value={formData.firstname}
                  isError={!!contactFormErrors?.firstname}
                  errorMessage={
                    contactFormErrors?.firstname
                      ? contactFormErrors?.firstname[0]
                      : ""
                  }
                  onChange={handleInput}
                  containerClassName="w-full"
                />

                <MyInput
                  label="Last Name"
                  required={true}
                  name="lastname"
                  value={formData.lastname}
                  isError={!!contactFormErrors?.lastname}
                  errorMessage={
                    contactFormErrors?.lastname
                      ? contactFormErrors?.lastname[0]
                      : ""
                  }
                  onChange={handleInput}
                  containerClassName="w-full"
                />
              </div>

              <div className="mb-4">
                <MyInput
                  label="Email"
                  required={true}
                  name="email"
                  type="email"
                  value={formData.email}
                  isError={!!contactFormErrors?.email}
                  errorMessage={
                    contactFormErrors?.email ? contactFormErrors?.email[0] : ""
                  }
                  onChange={handleInput}
                  containerClassName="w-full"
                />
              </div>
              <div className="mb-6 sm:mb-8 md:mb-8">
                <MyTextArea
                  label="Comment or message"
                  required={true}
                  name="message"
                  value={formData.message}
                  isError={!!contactFormErrors?.message}
                  errorMessage={
                    contactFormErrors?.message
                      ? contactFormErrors?.message[0]
                      : ""
                  }
                  onChange={handleInput}
                  className="min-h-[240px]"
                  // containerClassName="h-[239px] w-full border border-[#E6E6E6] rounded-[5px] px-[16px] py-[12px] outline-0 resize-none md:w-[100%] sm:w-[100%] font-D16px-M14px text-gray2"
                />
              </div>
              <div className="flex justify-end">
                <SubmitButton
                  text="SUBMIT"
                  highlighted={true}
                  showSpiner
                  reverseColors
                  disabled={
                    !formData.email ||
                    !formData.firstname ||
                    !formData.lastname ||
                    !formData.message
                  }
                  customClass="px-[48px] font-16px-ALL max-w-fit ml-auto"
                />
              </div>
            </form>
          )}
        </div>

        <div className="select-none sm:hidden md:flex md:justify-center lg:flex lg:h-full lg:items-center">
          <Image
            src="/images/contactUsImg.png"
            width={456}
            height={456}
            alt="Contact"
            className="object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
