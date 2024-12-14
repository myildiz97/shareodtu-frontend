import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

interface ICollectDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  foodName: string;
  onTake: (foodName: string) => void;
  code: string;
}

export function CollectDialog({  open, setOpen, foodName, code }: ICollectDialogProps) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="w-fit">
        <DialogHeader>
          <DialogTitle>
            Collection code for taking <strong>{foodName}</strong>
          </DialogTitle>
          <DialogDescription>
            Please show this code to the vendor to take your food.
          </DialogDescription>
        </DialogHeader>
        <p>
          Your code is: <strong>{code}</strong>
        </p>
      </DialogContent>
    </Dialog>
  )
}
