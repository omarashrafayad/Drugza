import { Link } from '@/i18n/routing';
import LoginForm from "@/components/partials/auth/login-form";
import Image from "next/image";
import Social from "@/components/partials/auth/social";
import Copyright from "@/components/partials/auth/copyright";
import Logo from "@/components/partials/auth/logo";
const Login = ({ params: { locale } }: { params: { locale: string } }) => {
  return (
    <>
      <div className="flex w-full items-center overflow-hidden min-h-dvh h-dvh basis-full">
        <div className="overflow-y-auto flex flex-wrap w-full h-dvh">
          <div
            className="lg:block hidden flex-1 overflow-hidden text-[40px] leading-[48px] text-default-600 relative z-1 bg-[#1474AE]"
          >
            <div className="absolute left-0 2xl:bottom-[-160px] bottom-[-130px] h-full w-full z-[-1]">
              <Image
                src="/login-photo.png"
                alt=""
                priority
                width={300}
                height={300}
                className="mb-10 w-[65%] my-auto mx-auto"
              />
              <h4 className="text-white text-xl lg:text-4xl text-center font-bold">Welcome Back!</h4>
              <p className="text-xl font-semibold text-white text-center">Please Enter your Information to Login</p>
            </div>
          </div>
          <div className="flex-1 relative">
            <div className=" h-full flex flex-col  dark:bg-default-100 bg-white">
              <div className="max-w-[524px] md:px-[42px] md:py-[44px] p-7  mx-auto w-full text-2xl text-default-900  mb-3 h-full flex flex-col justify-center">
                <div className="w-full pt-20 mx-auto ">
                  <div className="mb-6 w-full flex justify-center">
                    <Logo />
                  </div>
                </div>
                <LoginForm />
              </div>
              <div className="text-xs font-normal text-default-500  z-999 pb-10 text-center">
                <Copyright />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
