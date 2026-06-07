import { LoginForm } from "@/modules/auth/components/login-form/login-form";

export default function LoginPage() {
  return (
    <main
      style={{
        width: "100%",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 400,
        }}
      >
        <LoginForm />
      </div>
    </main>
  );
}
