"use client";

import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import Footer from "./components/footer/Footer";
import Navbar from "./components/navbar/Navbar";
import SideBar from "./components/sidebar/SideBar";
import Link from "next/link";
import { IoArrowForward } from "react-icons/io5";
import { FaRandom } from "react-icons/fa";
import CardSkeleton from "@/app/components/homePage/CardSkeleton";
import { ThemeContext } from "@/app/lib/ThemeContext"; // Import the ThemeContext
import GameCard from "./components/homePage/GameCard";
import { Game } from "@/app/types/homePage/games"; // Import the Game type

// Importing links and links2
import { links, links2 } from "./lib/SideBarLinks";

export default function Home() {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
  const { theme } = useContext(ThemeContext); // Use the ThemeContext
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState<Game[]>([]);

  useEffect(() => {
    const fetchGames = async () => {
      setLoading(true);
      try {
        const response = await axios.get("https://api.rawg.io/api/games", {
          params: {
            key: "4e2c61f658d44adcb51ed39f710a9d71",
          },
        });
        console.log(response.data.results);
        setGames(response.data.results);
      } catch (error) {
        console.error("There was a problem with the fetch operation:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGames();
  }, []);

  const handleSearch = (query: string) => {
    setSearchQuery(query);

    const filteredGames = games.filter((game) =>
      game.name.toLowerCase().includes(query.toLowerCase())
    );

    setSuggestions(filteredGames);
    console.log("Filtered Games:", filteredGames);
  };

  return (
    <>
      <Navbar onSearch={handleSearch} suggestions={suggestions} />
      <main
        className={`w-100 h-screen flex flex-col md:flex-row w-full pt-[50px] md:pt-[75px] relative ${
          theme === "dark" ? "dark-mode" : "light-mode"
        }`}
      >
        {/* Pass links and links2 to SideBar */}
        <SideBar links={links} links2={links2} />
        <section
          className={`mt-1 w-full md:w-[83%] bg-[#F4F4F4] md:ml-[16.6%] ${
            theme === "dark" ? "dark-mode-section" : "light-mode-section"
          }`}
        >
          <div
            className={`flex flex-wrap justify-between gap-[25px] md:gap-[0px] md:gap-y-5 py-[30px] px-[30px] ${
              theme === "dark" ? "dark-mode-content" : "light-mode-content"
            }`}
          >
            {loading
              ? // Render card skeleton if loading
                Array.from({ length: 10 }).map((_, index) => (
                  <CardSkeleton key={index} />
                ))
              : // Render games if not loading
                games.map((game, index) => (
                  <GameCard key={game.id} game={game} />
                ))}
            <div className="flex flex-col md:flex-row gap-[15px] text-[14px] justify-center w-full mt-[30px] text-center">
              <span
                className={`my-auto ${
                  theme === "dark" ? "text-white" : "text-gray-800"
                }`}
              >
                Don&apos;t see anything you like?{" "}
              </span>
              <Link
                href=""
                className="border border-red-500 py-[6px] px-3 text-red-500 rounded-sm flex gap-[10px] justify-center"
              >
                <span> View all games</span>{" "}
                <IoArrowForward className="my-auto" />
              </Link>
              <Link
                href=""
                className="border border-red-500 py-[6px] px-3 text-red-500 rounded-sm flex gap-[10px] justify-center"
              >
                <span>View something random</span>{" "}
                <FaRandom className="my-auto" />
              </Link>
            </div>
          </div>
          <Footer />
        </section>
      </main>
    </>
  );
}
