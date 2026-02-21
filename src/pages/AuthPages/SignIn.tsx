import PageMeta from "../../components/common/PageMeta";
import AuthLayout from "./AuthPageLayout";
import SignInForm from "../../components/auth/SignInForm";

export default function SignIn() {
  return (
    <>
      <PageMeta
        title="Sign In | StudyCafe Admin"
        description="Sign in to StudyCafe Admin - Manage your resources for studycafe.in"
      />
      <AuthLayout>
        <SignInForm />
      </AuthLayout>
    </>
  );
}
