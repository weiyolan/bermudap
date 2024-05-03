import Logo from "@/atoms/Logo";

export default function SplashScreen({ loaded }) {
  // const [single, setSingle] = useState(false)


  return (
    <div className={`loadingScreen fixed top-0 z-[100] flex h-screen  w-screen items-center justify-center bg-white transition-all duration-500 ${loaded ? 'opacity-0 invisible' : 'visible opacity-100'}`}>
      <div className="animate-pulse">
        <Logo color className={" h-18 w-18 relative "}></Logo>
        {/* <p className="text-brown  py-4">loading...</p> */}
      </div>
    </div>

  )
}