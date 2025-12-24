"use client";

import adminUserLogin from "@/app/actions/auth/admin_user_login/actions";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";
import Spinner from "../SvgComponents/Spinner";
import { mutate } from "swr";
import CustomModal from "../CustomModal/CustomModal";

const AdminLogin = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const finished = useRef(false);

  const adminCookie = searchParams.get("admin_cookie");
  const userId = searchParams.get("admin_user_id");

  const adminLoginAction = async () => {
    if (!adminCookie || !userId) return;
    const formData = new FormData();
    formData.append("cookie", adminCookie);
    formData.append("user_id", userId);
    const loginRes = await adminUserLogin(formData);
    if (loginRes.error) {
      finished.current = true;
      console.error("Error logging in admin user", loginRes.error);
    }
    if (loginRes.success) {
      finished.current = true;
      await mutate("/api/user/");
      await mutate("/api/cart/get_cart");
      await mutate(
        (key) => typeof key === "string" && key.startsWith("/api/products")
      );
      router.push("/");
    }
  };

  useEffect(() => {
    adminLoginAction();
  }, [adminCookie, userId]);

  if (adminCookie && userId && !finished.current) {
    return (
      <CustomModal
        animationClass="animate-slide-in-down"
        isOpen={true}
        onClose={() => null}
      >
        <div className="flex justify-center">
          <div className="font-D24px-M18px py-[24px] sm:font-medium">
            Logging in...
          </div>
        </div>
        <div className="flex h-full w-full items-center justify-center">
          <Spinner widthHeight="h-10 w-10" customClass="!m-0" />
        </div>
      </CustomModal>
    );
  }

  return null;
};

export default AdminLogin;
