import { Logo } from "@/components/icons";

export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-background z-50">
        <Logo className="h-40 w-40 animate-pulse" />
    </div>
  )
}
