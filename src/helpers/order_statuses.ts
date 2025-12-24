export const getOrderStatus = (status: string) => {
  switch (status) {
    case "on-hold":
      return "On Hold";
    case "processing":
      return "Processing";
    case "pending":
      return "Pending";
    case "completed":
      return "Completed";
    case "partial-shipped":
      return "Partial Shipped";
    case "cancelled":
      return "Cancelled";
    case "refunded":
      return "Refunded";
    case "failed":
      return "Failed";
    default:
      return "Checkout Draft"; // checkout-draft
  }
};
