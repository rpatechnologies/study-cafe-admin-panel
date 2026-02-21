import PageMeta from "../../components/common/PageMeta";
import AuthLayout from "../../layout/AuthPageLayout";
import SignUpForm from "../../components/auth/SignUpForm";

export default function SignUp() {
  return (
    <>
      <PageMeta
title="Sign Up | StudyCafe Admin"
      description="Create a StudyCafe Admin account to manage resources for studycafe.in"
      />
      <AuthLayout>
        <SignUpForm />
      </AuthLayout>
    </>
  );
}
