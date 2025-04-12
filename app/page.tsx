"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Heart, Pause, Play } from "lucide-react";
import QuoteDisplay from "@/components/quote-display";
import FinalCard from "@/components/final-card";
import Preloader from "@/components/preloader";
import { quotes } from "@/lib/quotes";

export default function Home() {
	const [loading, setLoading] = useState(true);
	const [shownQuotes, setShownQuotes] = useState<number[]>([]);
	const [currentQuoteIndex, setCurrentQuoteIndex] = useState<number | null>(
		null
	);
	const [showFinalCard, setShowFinalCard] = useState(false);
	const [isPlaying, setisPlaying] = useState(false);
	const audioRef = useRef<HTMLAudioElement | null>(null);

	// Simulate loading
	useEffect(() => {
		const timer = setTimeout(() => {
			setLoading(false);
			showNewQuote();
		}, 3000);
		return () => clearTimeout(timer);
	}, []);

	// Initialize audio
	useEffect(() => {
		if (!loading && audioRef.current) {
			audioRef.current.volume = 0.3;
			audioRef.current.play().catch(error => {
				console.log("Audio autoplay was prevented:", error);
				setisPlaying(true);
			});
		}
	}, [loading]);

	const showNewQuote = () => {
		const availableIndices = Array.from(
			{ length: quotes.length },
			(_, i) => i
		).filter(index => !shownQuotes.includes(index));

		// If all quotes have been shown, show the final card
		if (availableIndices.length === 0) {
			setShowFinalCard(true);
			return;
		}

		// Select random quote from available ones
		const randomIndex = Math.floor(Math.random() * availableIndices.length);
		const newQuoteIndex = availableIndices[randomIndex];

		setCurrentQuoteIndex(newQuoteIndex);
		setShownQuotes(prev => [...prev, newQuoteIndex]);
	};

	const resetQuotes = () => {
		setShownQuotes([]);
		setShowFinalCard(false);
		showNewQuote();
	};

	const toggleMute = () => {
		setisPlaying(!isPlaying);
		if (audioRef.current) {
			if (isPlaying) {
				audioRef.current.play();
			} else {
				audioRef.current.pause();
			}
		}
	};

	console.log(isPlaying);

	return (
		<main className="flex min-h-screen overflow-hidden flex-col items-center justify-center p-4 bg-gradient-to-br from-rose-50 to-pink-100">
			{loading ? (
				<Preloader />
			) : (
				<div className="w-full max-w-md mx-auto">
					<div className="relative bg-transparent rounded-2xl mb-6 min-h-[350px] flex flex-col">
						{/* Show either the final card or the current quote */}
						{showFinalCard ? (
							<FinalCard onReset={resetQuotes} />
						) : (
							currentQuoteIndex !== null && (
								<QuoteDisplay
									quote={quotes[currentQuoteIndex].text}
									author={quotes[currentQuoteIndex].author}
									onSwipeLeft={showNewQuote}
									onSwipeRight={showNewQuote}
								/>
							)
						)}

						<div className="fixed bottom-4 right-4 pt-6 flex justify-center items-center">
							<Button
								// variant="ghost"
								size="icon"
								onClick={toggleMute}
								// className="text-rose-500"
							>
								{isPlaying ? <Play /> : <Pause />}
							</Button>
						</div>
					</div>

					<div className="text-center text-sm text-rose-700 mt-4">
						<p>
							Made with <Heart className="animate-bounce inline mx-2" /> for Feolami
						</p>
					</div>
				</div>
			)}

			<audio ref={audioRef} loop className="hidden">
				<source
					src="https://res.cloudinary.com/tomiwadev/video/upload/v1613831178/song_p5dr1p.mp3"
					type="audio/mpeg"
				/>
				Your browser does not support the audio element.
			</audio>
		</main>
	);
}
