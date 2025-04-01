import Header from "./components/Header/Header";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./components/ui/alert-dialog";
import { Button } from "./components/ui/button";

function App() {
  /* to change theme, simply adjust teh styles.css file variables like --background and --foreground
    all shadcn/ui components that do not have explicitly set color will behave in accordance with these settings */
  return (
    <main>
      <Header />
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <h1 className="text-9xl font-bold font-mono bg-amber-400 hover:text-red-700 border-dashed border-4 border-red-500 rounded-b-4xl py-20">
          BIG B00TY LATINAS
        </h1>
        <h2 className="text-green-500 text-6xl">
          tailwind's working as never be4
        </h2>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              variant="outline"
              className="bg-red-600 px-30 my-10 text-sky-700 font-bold underline text-6xl"
            >
              SExy redd button from SHADCN/UI
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent className="bg-gray-500">
            <AlertDialogHeader>
              <AlertDialogTitle>Najnovsie spravy</AlertDialogTitle>
              <AlertDialogDescription>RADO BRUTAL SMRDI</AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className="bg-white">
                Ano viem to
              </AlertDialogCancel>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </main>
  );
}

export default App;
