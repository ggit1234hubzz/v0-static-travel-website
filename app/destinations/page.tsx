"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Filter, MapPin, Calendar, Info } from "lucide-react"

// Sample data for destinations
const destinations = [
  {
    id: 1,
    name: "Boulder, Colorado",
    region: "North America",
    interests: ["Trail Running", "Cycling", "Rock Climbing"],
    description: "A mecca for endurance athletes with high-altitude training opportunities and endless trails.",
    image: "/placeholder.svg?height=300&width=400",
    tips: [
      "Acclimatize to the altitude before intense training",
      "Hydrate more than usual due to the dry climate",
      "Check weather conditions as they can change rapidly",
    ],
    itinerary: {
      day1: "Morning trail run at Chautauqua Park, afternoon recovery at Boulder Creek",
      day2: "Cycling up Flagstaff Mountain, yoga session in the evening",
      day3: "Rock climbing at Eldorado Canyon, recovery swim at Boulder Reservoir",
      day4: "Long run on Boulder Creek Path, sports massage in the afternoon",
      day5: "Mountain biking at Valmont Bike Park, stretching and recovery",
    },
  },
  {
    id: 2,
    name: "Mallorca, Spain",
    region: "Europe",
    interests: ["Cycling", "Swimming", "Triathlon"],
    description: "A cyclist's paradise with smooth roads, challenging climbs, and beautiful Mediterranean scenery.",
    image: "/placeholder.svg?height=300&width=400",
    tips: [
      "Best cycling season is from February to June and September to November",
      "Rent a bike locally to avoid travel hassles",
      "Stay hydrated in the Mediterranean heat",
    ],
    itinerary: {
      day1: "Morning coastal ride to Cap Formentor, afternoon swim at Port de Pollença",
      day2: "Challenging climb up Sa Calobra, recovery walk along the beach",
      day3: "Easy spin around Alcúdia Bay, open water swimming session",
      day4: "Long ride through the Tramuntana mountains, massage therapy",
      day5: "Recovery ride to Artà, beach relaxation and stretching",
    },
  },
  {
    id: 3,
    name: "Kona, Hawaii",
    region: "North America",
    interests: ["Triathlon", "Swimming", "Running"],
    description: "Home of the IRONMAN World Championship with perfect conditions for triathlon training year-round.",
    image: "/placeholder.svg?height=300&width=400",
    tips: [
      "Train during the same time of day as your race to acclimatize to the heat",
      "Practice open water swimming in the bay to get used to ocean conditions",
      "Use high SPF sunscreen as the Hawaiian sun is intense",
    ],
    itinerary: {
      day1: "Swim at Kailua Bay, easy run along Ali'i Drive",
      day2: "Bike the Queen K Highway, recovery swim",
      day3: "Run to the Energy Lab, afternoon yoga for recovery",
      day4: "Long ride up to Hawi, light swim in the afternoon",
      day5: "Practice race simulation with transitions, recovery massage",
    },
  },
  {
    id: 4,
    name: "Chamonix, France",
    region: "Europe",
    interests: ["Trail Running", "Skiing", "Mountaineering"],
    description:
      "A trail runner's dream with access to the iconic Ultra-Trail du Mont-Blanc course and alpine terrain.",
    image: "/placeholder.svg?height=300&width=400",
    tips: [
      "Prepare for significant elevation changes on trails",
      "Carry emergency gear even on short runs due to changing mountain weather",
      "Consider hiring a local guide for the more technical routes",
    ],
    itinerary: {
      day1: "Acclimatization hike to Lac Blanc, stretching session in the evening",
      day2: "Technical trail run on part of the UTMB course, recovery walk in town",
      day3: "Long mountain run to Mer de Glace, ice bath in glacial streams",
      day4: "Vertical kilometer training, massage therapy in the afternoon",
      day5: "Easy trail to Plan de l'Aiguille, yoga and recovery",
    },
  },
  {
    id: 5,
    name: "Gold Coast, Australia",
    region: "Oceania",
    interests: ["Swimming", "Surfing", "Triathlon"],
    description: "Year-round warm weather with excellent swimming facilities and beautiful beaches for training.",
    image: "/placeholder.svg?height=300&width=400",
    tips: [
      "Early morning training is best to avoid the midday heat",
      "Be aware of strong ocean currents when swimming",
      "The Miami Aquatic Centre offers Olympic-standard facilities",
    ],
    itinerary: {
      day1: "Ocean swim at Burleigh Heads, beach run in the afternoon",
      day2: "Pool session at Miami Aquatic Centre, coastal cycle route",
      day3: "Surf lesson at Surfers Paradise, recovery walk along the esplanade",
      day4: "Triathlon brick session, afternoon stretching and yoga",
      day5: "Long beach run, ocean recovery swim",
    },
  },
  {
    id: 6,
    name: "Iten, Kenya",
    region: "Africa",
    interests: ["Running", "Altitude Training"],
    description: "The 'Home of Champions' where many elite Kenyan runners train at high altitude.",
    image: "/placeholder.svg?height=300&width=400",
    tips: [
      "Allow 2-3 weeks for proper altitude acclimatization",
      "Join local runners for group training sessions",
      "Respect local customs and training methods",
    ],
    itinerary: {
      day1: "Easy acclimatization run, visit to High Altitude Training Centre",
      day2: "Morning fartlek session with local runners, afternoon rest",
      day3: "Long run through tea plantations, recovery walk",
      day4: "Track session at Kamariny Stadium, stretching and mobility work",
      day5: "Easy trail run, visit to local running camp",
    },
  },
]

export default function DestinationsPage() {
  const [filteredDestinations, setFilteredDestinations] = useState(destinations)
  const [regionFilter, setRegionFilter] = useState("")
  const [interestFilter, setInterestFilter] = useState("")
  const [searchQuery, setSearchQuery] = useState("")

  // Get unique regions and interests for filter options
  const regions = [...new Set(destinations.map((dest) => dest.region))]
  const interests = [...new Set(destinations.flatMap((dest) => dest.interests))]

  // Apply filters when any filter changes
  const applyFilters = () => {
    let results = [...destinations]

    // Apply region filter
    if (regionFilter) {
      results = results.filter((dest) => dest.region === regionFilter)
    }

    // Apply interest filter
    if (interestFilter) {
      results = results.filter((dest) => dest.interests.includes(interestFilter))
    }

    // Apply search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      results = results.filter(
        (dest) => dest.name.toLowerCase().includes(query) || dest.description.toLowerCase().includes(query),
      )
    }

    setFilteredDestinations(results)
  }

  // Handle filter changes
  const handleRegionChange = (value: string) => {
    setRegionFilter(value)
    setTimeout(() => applyFilters(), 0)
  }

  const handleInterestChange = (value: string) => {
    setInterestFilter(value)
    setTimeout(() => applyFilters(), 0)
  }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
    setTimeout(() => applyFilters(), 0)
  }

  // Reset all filters
  const resetFilters = () => {
    setRegionFilter("")
    setInterestFilter("")
    setSearchQuery("")
    setFilteredDestinations(destinations)
  }

  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-16 flex items-center border-b">
        <Link className="flex items-center justify-center" href="/">
          <span className="font-bold text-xl">AthleticDestinations</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="/">
            Home
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="/destinations">
            Destinations
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
            About
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
            Contact
          </Link>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-amber-50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">Athletic Destinations</h1>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Discover the perfect training locations for your athletic pursuits. Filter by region or interest to
                  find your next adventure.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-8">
          <div className="container px-4 md:px-6">
            <div className="mb-8 p-6 bg-white rounded-lg shadow-sm border">
              <h2 className="text-2xl font-bold mb-4 flex items-center">
                <Filter className="mr-2 h-5 w-5" /> Filter Destinations
              </h2>
              <div className="grid gap-4 md:grid-cols-4">
                <div>
                  <label className="text-sm font-medium mb-1 block">Search</label>
                  <Input
                    placeholder="Search destinations..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                    className="w-full"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">Region</label>
                  <Select value={regionFilter} onValueChange={handleRegionChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="All Regions" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Regions</SelectItem>
                      {regions.map((region) => (
                        <SelectItem key={region} value={region}>
                          {region}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">Interest</label>
                  <Select value={interestFilter} onValueChange={handleInterestChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="All Interests" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Interests</SelectItem>
                      {interests.map((interest) => (
                        <SelectItem key={interest} value={interest}>
                          {interest}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-end">
                  <Button onClick={resetFilters} variant="outline" className="w-full">
                    Reset Filters
                  </Button>
                </div>
              </div>
            </div>

            {filteredDestinations.length === 0 ? (
              <div className="text-center py-12">
                <h3 className="text-xl font-medium mb-2">No destinations found</h3>
                <p className="text-gray-500 mb-4">Try adjusting your filters to see more results</p>
                <Button onClick={resetFilters} variant="outline">
                  Reset Filters
                </Button>
              </div>
            ) : (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filteredDestinations.map((destination) => (
                  <Card key={destination.id} className="overflow-hidden">
                    <div className="relative h-48">
                      <Image
                        src={destination.image || "/placeholder.svg"}
                        alt={destination.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-xl">{destination.name}</CardTitle>
                          <CardDescription className="flex items-center mt-1">
                            <MapPin className="h-4 w-4 mr-1" /> {destination.region}
                          </CardDescription>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {destination.interests.map((interest) => (
                          <Badge key={interest} variant="outline" className="bg-amber-50">
                            {interest}
                          </Badge>
                        ))}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-500">{destination.description}</p>

                      <Tabs defaultValue="tips" className="mt-4">
                        <TabsList className="grid w-full grid-cols-2">
                          <TabsTrigger value="tips" className="flex items-center">
                            <Info className="h-4 w-4 mr-2" /> Travel Tips
                          </TabsTrigger>
                          <TabsTrigger value="itinerary" className="flex items-center">
                            <Calendar className="h-4 w-4 mr-2" /> Sample Itinerary
                          </TabsTrigger>
                        </TabsList>
                        <TabsContent value="tips" className="mt-4">
                          <ul className="list-disc pl-5 space-y-1">
                            {destination.tips.map((tip, index) => (
                              <li key={index} className="text-sm">
                                {tip}
                              </li>
                            ))}
                          </ul>
                        </TabsContent>
                        <TabsContent value="itinerary" className="mt-4">
                          <div className="space-y-2">
                            <div className="grid grid-cols-[80px_1fr] gap-1">
                              <span className="font-medium text-sm">Day 1:</span>
                              <span className="text-sm">{destination.itinerary.day1}</span>
                            </div>
                            <div className="grid grid-cols-[80px_1fr] gap-1">
                              <span className="font-medium text-sm">Day 2:</span>
                              <span className="text-sm">{destination.itinerary.day2}</span>
                            </div>
                            <div className="grid grid-cols-[80px_1fr] gap-1">
                              <span className="font-medium text-sm">Day 3:</span>
                              <span className="text-sm">{destination.itinerary.day3}</span>
                            </div>
                            <div className="grid grid-cols-[80px_1fr] gap-1">
                              <span className="font-medium text-sm">Day 4:</span>
                              <span className="text-sm">{destination.itinerary.day4}</span>
                            </div>
                            <div className="grid grid-cols-[80px_1fr] gap-1">
                              <span className="font-medium text-sm">Day 5:</span>
                              <span className="text-sm">{destination.itinerary.day5}</span>
                            </div>
                          </div>
                        </TabsContent>
                      </Tabs>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-500">© 2024 AthleticDestinations. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  )
}
