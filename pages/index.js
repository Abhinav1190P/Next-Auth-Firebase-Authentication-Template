
import { useSession } from 'next-auth/react'
import Header from '../components/Header'
import Hero from '../components/Hero'

export default function Home() {

  const {data:session} = useSession()
  
  return (
   <div>
    <Header/>
    <Hero/>
   </div>
  )
}
