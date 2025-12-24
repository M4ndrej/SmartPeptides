import { cookies, headers } from "next/headers";
import { ZodEffects, ZodObject } from "zod";
import { hfetch } from "./fetchers";

export type ActionFactoryArgs = {
  validator: ZodObject<any, any> | ZodEffects<ZodObject<any, any>>;
  method?: "POST" | "PUT" | "PATCH" | "DELETE";
  queryKey: string;
  queryParams?: Record<string, string>;
  additionalFields?: Record<string, string>;
  errorMessage?: string;
  onSuccess?: (
    data: any,
    res: Response
  ) => {
    success: true;
    additional?: Record<string, boolean>;
  };
  dontAddKeys?: boolean;
  includeCookie?: boolean;
  includeUTMCookie?: boolean;
  includeAffiliateCookie?: boolean;
};

export type ActionResult = {
  success: boolean;
  error?: string;
  errors?: {
    [x: string]: string[] | undefined;
    [x: number]: string[] | undefined;
    [x: symbol]: string[] | undefined;
  };
  additional?: Record<string, boolean>;
};

export type ActionFunction = (formData?: FormData) => Promise<ActionResult>;

export function ActionFactory({
  validator,
  method = "POST",
  queryKey,
  queryParams = {},
  additionalFields,
  includeCookie,
  includeAffiliateCookie,
  includeUTMCookie,
  errorMessage = "An error occurred",
  onSuccess,
  dontAddKeys,
}: ActionFactoryArgs): ActionFunction {
  return async (formData?: FormData): Promise<ActionResult> => {
    const headersList = headers();
    const sendData = formData ? Object.fromEntries(formData) : {};
    const validatedFields = validator.safeParse(sendData);

    if (!validatedFields.success) {
      return {
        success: false,
        errors: validatedFields.error!.flatten().fieldErrors,
      };
    }

    let myHeaders = new Headers();
    const xForwardedIpAddress = headersList.get("X-Forwarded-For");
    if (xForwardedIpAddress) {
      const ipAddressParts = xForwardedIpAddress?.split(" ");
      const realIpAddress = ipAddressParts?.[1] || xForwardedIpAddress;
      myHeaders.set("X-Forwarded-For", realIpAddress!);
    }
    myHeaders.set("Content-Type", "application/json");

    const body = validatedFields.data;
    if (additionalFields) {
      for (const key in additionalFields) {
        body[key] = additionalFields[key];
      }
    }

    if (includeCookie) {
      const cookie = cookies().get(`${process.env.WP_LOGGED_IN}`)?.value;
      queryParams["cookie"] = cookie ?? "";
      myHeaders.append("Cookie", `${process.env.WP_LOGGED_IN}=${cookie}`);
    }

    if (includeAffiliateCookie) {
      const affCookie = cookies().get("wpam_id")?.value;
      queryParams["wpam_id"] = affCookie ?? "";
      // myHeaders.append("Cookie", `wpam_id=${affCookie}`);
    }

    if (includeUTMCookie) {
      const utmCookie = cookies().get("utm_info")?.value;
      queryParams["utm_info"] = utmCookie ?? "";
    }

    const reqOpts: RequestInit = {
      method: method,
      headers: myHeaders,
      redirect: "follow",
      body: JSON.stringify(body),
    };

    const params = new URLSearchParams(queryParams);
    const res = await hfetch(
      `${process.env.API_URL}/${queryKey}?${params.toString()}`,
      reqOpts,
      dontAddKeys ?? false
    );

    try {
      const data = await res.json();
      if (!res.ok) {
        return {
          success: false,
          error: data?.message ?? errorMessage,
        };
      }

      if (onSuccess) {
        return onSuccess(data, res);
      } else {
        return {
          success: true,
        };
      }
    } catch (error: any) {
      console.error(error);
      return {
        success: false,
        error: error?.message ?? errorMessage,
      };
    }
  };
}
