import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { Footer } from 'src/layouts/default';
import { dataUser } from 'src/recoils/dataUser';
import LoginFormSection from 'src/sections/auth/LoginForm';

export default function Login() {

  const router = useRouter();
  const user = useRecoilValue(dataUser)

  useEffect(() => {
    if (user?.role) {
      router.replace('/')
    }
  })

  return (
    <div className="overflow-hidden">
      <LoginFormSection />
      <Footer />
    </div>
  );
}
