import Logo from "@/atoms/Logo";

export default function SplashScreen() {
  return (
    <div className="loadingScreen fixed top-0 z-[100] flex h-screen  w-screen items-center justify-center bg-white">
      <div className="animate-pulse">
        <Logo color className={" h-18 w-18 relative "}></Logo>
      </div>
    </div>

  )
}