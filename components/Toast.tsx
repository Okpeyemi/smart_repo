import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

type ToastProps = {
  title?: string;
  desription?: string;
  link?: string;
  pin?: string;
};

const Toast: React.FC<ToastProps> = ({ title, desription, link, pin }) => {
  return (
    <AlertDialog open={true}>
      <AlertDialogContent>
        <AlertDialogHeader className="flex flex-col justify-center items-center">
          <AlertDialogTitle className="text-[30px]">{title}</AlertDialogTitle>
          <AlertDialogDescription className="flex flex-col text-[20px]">
            {desription}
            {pin ? (
                <span className="text-red-500 text-center text-[30px] font-bold mt-5">{pin}</span>
            ) : (
              ""
            )}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex w-full">
          <AlertDialogAction className="w-full p-7">
            <a href={`/${link}`} className="text-[20px]">Ok</a>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
export default Toast;
