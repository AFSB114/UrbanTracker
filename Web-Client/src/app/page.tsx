"use client"

import Header from "landing/header"
import Hero from "landing/hero"
import Features from "landing/features"
import HowItWorks from "landing/how-it-works"
import PrivacyInfo from "landing/privacy-info"
import Team from "landing/team"
import Footer from "landing/footer"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <Features />
  <HowItWorks />
  <Team />
  <PrivacyInfo />
      <Footer />
    </main>
  )
}
