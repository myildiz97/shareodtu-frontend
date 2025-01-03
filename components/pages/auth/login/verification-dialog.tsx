import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { OTPForm } from './otp-form'

export function VerificationDialog(
  { open, setOpen, email, password, setIsLoggingIn }: 
  { open: boolean; setOpen: (open: boolean) => void; email: string; password: string; setIsLoggingIn: (loading: boolean) => void; }
) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {/* <DialogTrigger asChild>
        <Button variant="outline" className='text-background bg-foreground'>Edit Profile</Button>
      </DialogTrigger> */}
      <DialogContent className="w-fit">
        <DialogHeader>
          <DialogTitle>
            Verify your account
          </DialogTitle>
          <DialogDescription>
            Please enter the code sent to your email.
          </DialogDescription>
        </DialogHeader>
        <OTPForm email={email} password={password} setOpen={setOpen} setIsLoggingIn={setIsLoggingIn} />
      </DialogContent>
    </Dialog>
  )
}
