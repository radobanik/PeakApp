import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
} from '@/components/ui/alert-dialog'
import HeaderBar from '@/components/HeaderBar'

export default function HomePage() {
  return (
    <main>
      <HeaderBar />
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <h1 className="text-7xl font-bold font-mono bg-amber-400 hover:text-red-700 border-dashed border-4 border-red-500 rounded-b-4xl py-20">
          BIG B00TY LATINAS filipino edition
        </h1>
        <h2 className="text-green-500 text-6xl">tailwind&apos;s working as never be4</h2>

        {/* Link to Login */}
        <Link to="/login">
          <Button className="mt-6 text-xl font-semibold bg-amber-700 hover:bg-amber-600 text-white px-8 py-4 rounded-lg shadow-lg">
            Login Here
          </Button>
        </Link>

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
              <AlertDialogTitle>Najnovšie správy</AlertDialogTitle>
              <AlertDialogDescription>RADO BRUTAL SMRDI</AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className="bg-white">Áno viem to</AlertDialogCancel>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </main>
  )
}
