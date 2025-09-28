import { SignInButton, UserButton } from "@clerk/nextjs";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

export default function HomePage() {
  return (
    <div className="flex items-center justify-between p-4">
      <div className="flex items-center gap-4">
        <SignInButton />
        <UserButton />
      </div>
      <ThemeToggle />
    </div>
  );
}
