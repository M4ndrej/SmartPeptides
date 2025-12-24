import AdminLogin from "@/components/Cookies/AdminLogin";
import CookieSetter from "@/components/Cookies/CookieSetter";
import CouponSetter from "@/components/Cookies/CouponSetter";
import { Suspense } from "react";

const CookieConfigs = () => {
  return (
    <Suspense>
      <CookieSetter />
      <CouponSetter />
      <AdminLogin />
    </Suspense>
  );
};

export default CookieConfigs;
