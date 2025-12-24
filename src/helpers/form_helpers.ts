type AcceptedFormValues = string | number | boolean | undefined;

type AcceptedFormType = Record<string | number | symbol, AcceptedFormValues>;
type AcceptedReferenceType = Record<string | number | symbol, any>;

export function didFormChange<
  T extends AcceptedFormType,
  V extends AcceptedReferenceType,
>(curr: T, prev: V): boolean {
  let formChangesCount = 0;
  for (const key in curr) {
    const currVal: AcceptedFormValues = curr[key];
    const prevVal: AcceptedFormValues = prev[key as keyof T];
    if (currVal !== prevVal && typeof currVal === "string" && currVal?.length) {
      formChangesCount++;
    }
  }
  return formChangesCount > 0;
}
