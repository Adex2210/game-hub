// /app/game-details/page.tsx

'use client';

import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Image from 'next/image';
import Navbar from '@/app/components/navbar/Navbar';
import Footer from '@/app/components/footer/Footer';

interface GameDetailsProps {
  id: number;
  name: string;
  description: string;
  background_image: string;
  released: string;
  rating: number;
  stores: { store: { name: string }, url: string }[];
}

const GameDetails: React.FC = () => {
  const searchParams = useSearchParams();
  const gameId = searchParams ? searchParams.get('id') : null;
  const gameName = searchParams ? searchParams.get('name') : null;
  const [gameDetails, setGameDetails] = useState<GameDetailsProps | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (gameId) {
      const fetchGameDetails = async () => {
        setLoading(true);
        try {
          const response = await axios.get(`https://api.rawg.io/api/games/${gameId}`, {
            params: {
              key: '4e2c61f658d44adcb51ed39f710a9d71',
            },
          });
          setGameDetails(response.data);
        } catch (error) {
          console.error('Error fetching game details:', error);
        } finally {
          setLoading(false);
        }
      };

      fetchGameDetails();
    }
  }, [gameId]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!gameDetails) {
    return <p>No game details found.</p>;
  }

  return (
    <>
      <Navbar />
      <main className="w-full h-full flex flex-col items-center pt-10">
        <h1 className="text-3xl font-bold mb-4">{gameDetails.name}</h1>
        <div className="relative w-full h-64">
          <Image
            src={gameDetails.background_image}
            alt={gameDetails.name}
            layout="fill"
            objectFit="cover"
            className="rounded"
          />
        </div>
        <p className="mt-4">{gameDetails.description}</p>
        <p className="mt-2">Released: {gameDetails.released}</p>
        <p className="mt-2">Rating: {gameDetails.rating}</p>
        <div className="mt-4">
          <h2 className="text-2xl font-semibold">Available on:</h2>
          {gameDetails.stores.map((store, index) => (
            <p key={index}>
              <a href={store.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
                {store.store.name}
              </a>
            </p>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default GameDetails;
