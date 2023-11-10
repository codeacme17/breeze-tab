import { Navbar } from '@/components/navbar'
import { MainContainer } from '@/components/main-container'
import { Toaster } from '@/components/ui/toaster'

function App() {
  return (
    <main className="h-screen w-screen bg-background/10 font-[Poppins]">
      <Navbar />
      <MainContainer />
      <Toaster />
    </main>
  )
}

export default App
