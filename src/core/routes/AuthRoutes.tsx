import Login from '@/features/auth/Login';
import CreateBloodBankAccountScreen from '@/features/auth/pages/bloodBank/CreateBloodBankAccountScreen';
import OtpScreen from '@/features/auth/pages/bloodBank/OtpScreen';

import AccountSuccessScreen from '@/features/auth/pages/donor/AccountSuccess';
import CreateAccountScreen from '@/features/auth/pages/donor/CreateAccountScreen';
import Register from '@/features/auth/Register';
import React from 'react'

interface AuthRoutes {
  title: string;
  route: string;
  component: React.FC;
}

const authRoutes: AuthRoutes[] = [
  {
    title: "Register",
    route: "register",
    component: Register,
  },
  {
    title: "Login",
    route: "login",
    component: Login,
  },
  {
    title: "Account Type",
    route: "register/donor",
    component: CreateAccountScreen,
  },

  {
    title: "Successful",
    route: "register/success",
    component: AccountSuccessScreen,
  },
   {
    title: "Create Blood Bank Account",
    route: "register/blood-bank",
    component: CreateBloodBankAccountScreen,
  },
  {
    title: "Verify OTP",
    route: "register/otp",
    component: OtpScreen,
  },

];

export default authRoutes;

