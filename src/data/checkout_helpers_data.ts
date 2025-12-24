import { z } from "zod";

export const cardProcessorFirstDigit: Record<string, string> = {
  "3": "Amex",
  "4": "Visa",
  "5": "MasterCard",
  "6": "Discover",
};

export const payWithCardValidation = z.object({
  "credit-card-number": z
    .string()
    .refine(
      (value) => /^[0-9]{15,16}$/.test(value),
      "Please enter a valid credit card number!!!"
    )
    .refine(
      (value) => /^(3|4|5|6)/.test(value),
      "We only accept MasterCard, Visa, Amex and Discover."
    ),
  "credit-card-expiry": z
    .string()
    .min(5, { message: "Invalid Expiration" })
    .max(5, { message: "Invalid Expiration" }),
  "credit-card-cvc": z
    .string()
    .min(3, { message: "Invalid CVC" })
    .max(4, { message: "Invalid CVC" }),
});

export const payWithMVCardValidation = z.object({
  "credit-card-number": z
    .string()
    .refine(
      (value) => /^[0-9]{15,16}$/.test(value),
      "Please enter a valid credit card number!!!"
    )
    .refine(
      (value) => /^(4|5)/.test(value),
      "We only accept MasterCard and Visa."
    ),
  "credit-card-expiry": z
    .string()
    .min(5, { message: "Invalid Expiration" })
    .max(5, { message: "Invalid Expiration" }),
  "credit-card-cvc": z
    .string()
    .min(3, { message: "Invalid CVC" })
    .max(4, { message: "Invalid CVC" }),
});

export const payWithFlexipayValidation = z.object({
  "credit-card-number": z
    .string()
    .refine(
      (value) => /^[0-9]{15,16}$/.test(value),
      "Please enter a valid credit card number!!!"
    ),
  "credit-card-expiry": z
    .string()
    .min(5, { message: "Invalid Expiration" })
    .max(5, { message: "Invalid Expiration" }),
  "credit-card-cvc": z
    .string()
    .min(3, { message: "Invalid CVC" })
    .max(4, { message: "Invalid CVC" }),
  "credit-card-type": z.union([z.literal("credit"), z.literal("debit")]),
});
