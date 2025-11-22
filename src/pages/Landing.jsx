import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

import logo from "../assets/moodbitlogo.png"
import cat from "../assets/cat.png"

import smart from "../assets/donate.gif"
import ai from "../assets/digitalization.gif"
import moodbitIcon from "../assets/magnifying-glass.gif"
import charts from "../assets/growth.gif"

export default function Landing() {
  return (
    <div className="w-full min-h-screen bg-white flex justify-center px-4">
      <div className="max-w-5xl w-full py-10">

        {/* Header */}
        <header className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-2">
            <img src={logo} alt="MoodBit Logo" className="h-12" />
          </div>

          <Button className="bg-purple-700 hover:bg-purple-800 text-white px-6">
            Get Started
          </Button>
        </header>

        {/* Hero Section */}
        <section className="flex flex-col-reverse md:flex-row items-center justify-between">

          {/* Left Text */}
          <div className="max-w-xl">
            <h1 className="text-5xl font-extrabold leading-tight">
              BUDGETING.<br />
              BUT MAKE IT{" "}
              <span className="text-purple-600">FUN.</span>
            </h1>

            <p className="mt-4 text-gray-600 text-lg">
              Track your expenses, predict your spending,<br />
              and watch your <span className="text-purple-600 font-medium">MoodBit</span> evolve with your financial habits.
            </p>

            <Button className="mt-6 bg-purple-700 hover:bg-purple-800 text-white px-8 py-6 text-lg">
              Get Started
            </Button>
          </div>

          {/* Right Cat Image */}
          <div>
            <img src={cat} alt="MoodBit Cat" className="h-72" />
          </div>

        </section>

        {/* Features Section */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-14">

          {/* Smart Tracking */}
          <Card className="shadow-md hover:shadow-lg transition">
            <CardHeader>
              <img src={smart} className="h-12 mb-2" />
              <CardTitle>Smart Tracking</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-600">
              Log daily expenses easily and see instant insights.
            </CardContent>
          </Card>

          {/* AI Predictions */}
          <Card className="shadow-md hover:shadow-lg transition">
            <CardHeader>
              <img src={ai} className="h-12 mb-2" />
              <CardTitle>AI Predictions</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-600">
              Get future forecasts and spending trends.
            </CardContent>
          </Card>

          {/* MoodBit Buddy */}
          <Card className="shadow-md hover:shadow-lg transition">
            <CardHeader>
              <img src={moodbitIcon} className="h-12 mb-2" />
              <CardTitle>Your MoodBit</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-600">
              A cute digital buddy that reacts to your spending mood.
            </CardContent>
          </Card>

          {/* Visual Insights */}
          <Card className="shadow-md hover:shadow-lg transition">
            <CardHeader>
              <img src={charts} className="h-12 mb-2" />
              <CardTitle>Visual Insights</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-600">
              See your financial health through interactive charts.
            </CardContent>
          </Card>

        </section>
      </div>
    </div>
  )
}
