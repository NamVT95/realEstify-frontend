import Footer from "./components/Footer"
import Header from "./components/Header"

function FullLayout({
  children,
}:{
  children: React.ReactNode
}) {
  return (
    <div>
      <Header />
      <div className="min-h-screen">
        {children}
      </div>
      <Footer />
    </div>
  )
}

export default FullLayout
