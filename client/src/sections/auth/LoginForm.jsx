import { yupResolver } from '@hookform/resolvers/yup';
import Link from 'next/link';
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { EyeIcon, EyeIconClose, FbLogin, GoogleIcon, LogoIconLogin } from 'src/components/icons';
import * as yup from 'yup';
import axios from 'axios';

//jwt-decode (để decode jwt token của bạn)
import { axiosClient } from 'src/utils/axios';
import { useSetRecoilState } from 'recoil';
import { dataUser } from 'src/recoils/dataUser';
import { signIn } from 'next-auth/react';
import { toast } from 'react-toastify';

const schema = yup.object().shape({
  email: yup.string().trim().required('Email hoặc số điện thoại của bạn đang trống!'),
  password: yup.string().trim().required('Mật khẩu của bạn đang trống!'),
});
export default function LoginFormSection() {
  const setUser = useSetRecoilState(dataUser);
  const router = useRouter();
  const [errorState, setError] = useState('');
  const [isShow, setIsShow] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const handleShowPassword = () => {
    setIsShow(prev => !prev);
  }

  const onSubmit = async (data) => {
    const res = axios({
      method: 'POST',
      url: 'http://miki-shop.somee.com/api/Users/login',
      data: data,
    });
    res.then(() => router.push('/')).catch((e) => setError(e.response.data.message));

    res.then((rep) => {
      const dataUser = rep.data.data;
      const user = {
        role: dataUser.role,
        email: dataUser.email,
        firstName: dataUser.name,
        userInforId: dataUser.id,
        accessExpire: dataUser.expire_At,
        refreshToken: dataUser.refresh_Token,
      };
      setUser(user);
      const accessToken = dataUser.access_token;
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('expire_at', user.accessExpire.toString());
      localStorage.setItem('userId', user.userInforId);
      toast.success("Login successfully");
    });
  };

  return (
    <>
      <svg
        className="absolute left-[911px] top-[1455px]"
        xmlns="http://www.w3.org/2000/svg"
        width="529"
        height="151"
        viewBox="0 0 529 151"
        fill="none"
      >
        <circle cx="275.5" cy="275.5" r="275.5" fill="#B78D71" fillOpacity="0.15" />
        <circle cx="275.5" cy="275.5" r="220.453" fill="#B78D71" fillOpacity="0.1" />
      </svg>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="absolute top-[100px]"
        width="122"
        height="279"
        viewBox="0 0 202 359"
        fill="none"
      >
        <circle cx="22.5" cy="179.5" r="179.5" fill="#B78D71" fillOpacity="0.15" />
        <circle cx="22.5002" cy="179.5" r="143.634" fill="#B78D71" fillOpacity="0.1" />
      </svg>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="absolute right-[400px] top-[-40px]"
        width="279"
        height="122"
        viewBox="0 0 359 207"
        fill="none"
      >
        <circle cx="179.5" cy="27.5" r="179.5" fill="#B78D71" fillOpacity="0.15" />
        <circle cx="179.5" cy="27.5" r="143.634" fill="#B78D71" fillOpacity="0.1" />
      </svg>
      <div className="wrapLogin">
        <div>
          <img className="w-[646px] h-[852px]" src="/assets/images/loginForm.jpg" alt="login" />
        </div>
        <div>
          <div className="w-[490px]">
            <Link href={"/"}>
              <div className="mt-[56px] h-[160px] cursor-pointer">
                <LogoIconLogin />
                <h1 className="logo ml-[102px]">MIKI JEWELRY</h1>
              </div>
            </Link>
            <div className="mx-[40px]">
              <h1 className="h1Login">Đăng nhập</h1>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-col">
                  <div className="inputLogin mb-[2px]">
                    <input
                      className="inputEmailLogin"
                      type="text"
                      placeholder="Nhập email hoặc số điện thoại"
                      {...register('email')}
                    />
                  </div>
                  <p className="mb-[13px] text-[15px] text-[#D2311B] h-[16px]">
                    {errors.email?.message || errorState}
                  </p>
                  <div className="inputLogin mb-[2px]">
                    <input
                      className="inputEmailLogin"
                      type={isShow ? "text" : "password"}
                      placeholder="Nhập mật khẩu"
                      {...register('password')}
                    />
                    {
                      isShow ? <EyeIcon handleCick={handleShowPassword} className={'w-8 h-8 mr-3 cursor-pointer'} /> : <EyeIconClose handleCick={handleShowPassword} className={'w-8 h-8 mr-3 cursor-pointer'} />
                    }
                  </div>
                  <p className="mb-[24px] text-[15px] text-[#D2311B] h-[16px]">
                    {errors.password?.message}
                  </p>
                </div>
                <p className="misPass">Quên mật khẩu</p>
                <button className="btnLogin">Đăng nhập</button>
                <p className="otherLogin">Hoặc đăng nhập bằng</p>
                <div className="wrapSocialLogin">
                  <div className="fbLogin" onClick={signIn}>
                    <FbLogin />
                    Facebook
                  </div>
                  <div className="googleLogin" onClick={signIn}>
                    <GoogleIcon />
                    Google
                  </div>
                </div>
                <div className="wrapGotoRegister">
                  <p className="font-medium">Bạn chưa có tài khoản?</p>
                  <Link href="/register">
                    <p className="gotoRegister">Đăng kí</p>
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
