import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import Motif from "./Motif";
import { useState } from "react";
import { Button } from "./ui/button";

type ToastProps = {
  title?: string;
  desription?: string;
  link?: string;
  pin?: string;
  userId?: number;
};

const Toast: React.FC<ToastProps> = ({
  title,
  desription,
  link,
  pin,
  userId,
}) => {
  const [addMotif, setAddMotif] = useState(false);
  const [alertDialog, setAlertDialog] = useState(true);

  const handleSubmit = () => {
    setAlertDialog(false);
    setAddMotif(true);
  };

  return (
    <div>
      <AlertDialog open={alertDialog}>
        <AlertDialogContent>
          <AlertDialogHeader className="flex flex-col justify-center items-center">
            <AlertDialogTitle className="text-[30px]">{title}</AlertDialogTitle>
            <AlertDialogDescription className="flex flex-col text-[20px]">
              {desription}
              {pin ? (
                <span className="text-red-500 text-center text-[30px] font-bold mt-5">
                  {pin}
                </span>
              ) : (
                ""
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex w-full">
            <AlertDialogAction className="w-full bg-[#0004FF] p-7 mt-5 rounded-[18px] hover:bg-blue-500 text-[20px]">
              {link ? (
                <a href={`${link}`} className="w-full">Ok</a>
              ) : (
                <span onClick={handleSubmit} className="w-full">Ok</span>
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      {addMotif && userId !== undefined && <Motif userId={userId} />}
    </div>
  );
};
export default Toast;
