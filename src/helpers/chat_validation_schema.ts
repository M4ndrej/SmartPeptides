import { z } from "zod";

const chatInputSchema = z.object({
  message: z.string().min(1, "Message cannot be empty"),
});

// Order input validation schema
const orderInputSchema = z.object({
  email: z
    .string()
    .email("Invalid email address")
    .regex(/^[\w-]+@[\w-]+\.[a-zA-Z]{2,7}$/, "Invalid email format"),
  orderId: z
    .string()
    .min(1, "Order ID is required")
    .regex(/^[A-Za-z0-9]+$/, "Order ID must be alphanumeric"),
  message: z.string().min(1, "Message cannot be empty"),
});

// Function to validate chat input and return errors
export const validateChatInput = (input: { message: string }) => {
  try {
    const result = chatInputSchema.parse(input);
    return { isValid: true, errors: {} };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { isValid: false, errors: error.flatten().fieldErrors };
    }
    throw error; // rethrow if it's not a ZodError
  }
};

// Function to validate order input and return errors
export const validateOrderInput = (input: typeof orderInputSchema._input) => {
  try {
    const result = orderInputSchema.parse(input);
    return { isValid: true, errors: {} };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { isValid: false, errors: error.flatten().fieldErrors };
    }
    throw error; // rethrow if it's not a ZodError
  }
};
