import { SignInButton, UserButton } from "@clerk/nextjs";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { PricingTable } from "@/services/clerk/components/PricingTable";

export default function HomePage() {
  return (
    <div className=" my-4 space-y-4">
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-4">
          <SignInButton />
          <UserButton />
        </div>
        <ThemeToggle />
      </div>
      <PricingTable />
    </div>
  );
}
