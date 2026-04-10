import { SignIn } from "@clerk/nextjs";
export default function page() {
  return (
    <div className="flex justify-center py-24">
      <SignIn />
    </div>
  );
}