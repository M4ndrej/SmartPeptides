import {
  ChangeEvent,
  Dispatch,
  FC,
  SetStateAction,
  useRef,
  useState,
} from "react";
import ErrorMessage from "../ErrorSuccessMessages/ErrorMessage";
import WarningIcon from "../Icons/WarningIcon";
import Input from "../Input/Input";
import SubmitButton from "../SubmitButton/SubmitButton";
import submitTrackingFormAction, {
  TrackingValidationErros,
} from "@/app/actions/tracking/actions";
import { Order } from "@/types/orders";

interface TrackingFormProps {
  setOrder: Dispatch<SetStateAction<Order | undefined>>;
}

const TrackingForm: FC<TrackingFormProps> = ({ setOrder }) => {
  const [formData, setFormData] = useState({
    orderId: "",
    email: "",
  });
  const [error, showError] = useState("");
  const [formErrors, setFormErrors] = useState<TrackingValidationErros>();
  const trackingBtn = useRef<HTMLButtonElement>(null);

  const handleInput = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
  ) => {
    const fieldName = e.target.name;
    const fieldValue = e.target.value;

    showError("");
    setFormErrors({
      ...formErrors,
      [fieldName]: undefined,
    });

    setFormData((prevState) => ({
      ...prevState,
      [fieldName]: fieldValue,
    }));
  };

  const handleSubmitTrackingForm = async (formData: FormData) => {
    const trackingActionResponse = await submitTrackingFormAction(formData);
    if (trackingActionResponse?.errors) {
      setFormErrors(trackingActionResponse?.errors);
      return;
    }

    if (trackingActionResponse?.error) {
      showError(trackingActionResponse?.error);
      return;
    }

    setOrder(trackingActionResponse.order);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      trackingBtn?.current?.click();
    }
  };

  return (
    <>
      <div className="font-D16px-M13px mx-auto mb-[32px] max-w-[65%] text-center sm:max-w-[100%]">
        To check the status of your order, simply enter your Order ID in the
        field below and click the &quot;Track&quot; button. You can find your
        Order ID on your purchase receipt and in the confirmation email sent
        after your order was placed.
      </div>

      <form action={handleSubmitTrackingForm}>
        <div className="flex w-full flex-col items-center">
          <div className="mb-[16px] sm:w-full">
            <div className="font-16px-ALL mb-[8px] text-black">Order ID</div>
            <Input
              label="Found in your order confirmation email."
              name="orderId"
              required={true}
              value={formData.orderId}
              type="text"
              customClass="w-[389px] sm:w-full !border-none"
              parentCustomClass="sm:w-full"
              onChange={handleInput}
              onKeyDown={handleKeyPress}
              errorInput={!!formErrors?.orderId}
              customErrorText={
                formErrors?.orderId ? formErrors?.orderId[0] : ""
              }
            />
          </div>

          <div className="mb-[16px] sm:w-full">
            <div className="font-16px-ALL mb-[8px] text-black">
              Billing email
            </div>
            <Input
              label="Email you used during checkout."
              name="email"
              required={true}
              value={formData.email}
              type="email"
              customClass="w-[389px] sm:w-full !border-none"
              parentCustomClass="sm:w-full"
              onChange={handleInput}
              onKeyDown={handleKeyPress}
              errorInput={!!formErrors?.email}
              customErrorText={formErrors?.email ? formErrors?.email[0] : ""}
            />
          </div>
          {error ? (
            <ErrorMessage
              message={error}
              customClass="!w-[390px] h-[48px]"
              customIcon={
                <WarningIcon width={28} height={24} className="!fill-black" />
              }
              hideTitle
            />
          ) : (
            <SubmitButton
              ref={trackingBtn}
              text="TRACK"
              highlighted={true}
              showSpiner
              reverseColors
              customClass="w-[389px] font-16px-ALL font-medium max-w-[389px] mx-auto sm:w-full sm:max-w-none"
            />
          )}
        </div>
      </form>
    </>
  );
};

export default TrackingForm;
