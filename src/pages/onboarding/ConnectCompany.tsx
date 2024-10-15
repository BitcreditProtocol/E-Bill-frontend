import { Button } from "@/components/ui/button";
import {
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function ConnectCompany() {
  return (
    <div className="flex flex-col gap-6 max-w-[320px] w-full">
      <h1 className="text-center">Connect company</h1>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-4 py-4 px-2 bg-[#fafafa]">
          <CardHeader className="p-0">
            <CardTitle className="text-md">New Company</CardTitle>
            <CardDescription className="text-[#71717A]">
              Create and register a new company to manage your business
              operations.
            </CardDescription>
          </CardHeader>
          <CardFooter className="p-0">
            <Button
              className="w-full bg-transparent hover:border-transparent"
              variant="link"
            >
              + Create new company
            </Button>
          </CardFooter>
        </div>

        <div className="flex flex-col gap-4 py-4 px-2 bg-[#fafafa]">
          <CardHeader className="p-0">
            <CardTitle className="text-md">Request to join a company</CardTitle>
            <CardDescription className="text-[#71717A]">
              Join an already registered company to collaborate with your team.
            </CardDescription>
          </CardHeader>
          <CardFooter className="p-0">
            <Button
              className="w-full bg-transparent hover:border-transparent"
              variant="link"
            >
              + Join existing company
            </Button>
          </CardFooter>
        </div>

        <Button className="hover:border-transparent" variant="outline">
          Skip to dashboard
        </Button>
      </div>
    </div>
  );
}
