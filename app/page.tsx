"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Volume2, VolumeX } from "lucide-react";
import QuoteDisplay from "@/components/quote-display";
import FinalCard from "@/components/final-card";
import Preloader from "@/components/preloader";

// Update the quotes array to include author information
const quotes = [
	{
		text: "Distance means so little when friendship means so much.",
		author: "Sarah",
	},
	{
		text:
			"Good friends are like stars. You don't always see them, but you know they're always there.",
		author: "Michael",
	},
	{
		text:
			"The most beautiful discovery true friends make is that they can grow separately without growing apart.",
		author: "Jessica",
	},
	{
		text:
			"A friend is someone who knows the song in your heart and can sing it back to you when you have forgotten the words.",
		author: "David",
	},
	{
		text:
			"Friendship isn't about being inseparable, it's being separated and nothing changes.",
		author: "Emma",
	},
	{
		text:
			"No distance of place or lapse of time can lessen the friendship of those who are thoroughly persuaded of each other's worth.",
		author: "Daniel",
	},
	{
		text:
			"True friendship isn't about being there when it's convenient; it's about being there when it's not.",
		author: "Olivia",
	},
	{
		text:
			"Sometimes the perfect friend is the one who is there, even when they're far away.",
		author: "James",
	},
	{
		text: "The language of friendship is not words but meanings.",
		author: "Sophia",
	},
	{
		text:
			"A real friend is one who walks in when the rest of the world walks out.",
		author: "Alex",
	},
];

export default function Home() {
	const [loading, setLoading] = useState(true);
	const [shownQuotes, setShownQuotes] = useState<number[]>([]);
	const [currentQuoteIndex, setCurrentQuoteIndex] = useState<number | null>(
		null
	);
	const [showFinalCard, setShowFinalCard] = useState(false);
	const [isMuted, setIsMuted] = useState(false);
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
		if (audioRef.current) {
			audioRef.current.muted = !audioRef.current.muted;
			setIsMuted(!isMuted);
		}
	};

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
								{isMuted ? <VolumeX /> : <Volume2 />}
							</Button>
						</div>
					</div>

					<div className="text-center text-sm text-rose-700 mt-4">
						<p>Made with ♥ for Feolami</p>
					</div>
				</div>
			)}

			<audio ref={audioRef} loop muted={isMuted} className="hidden">
				<source
					src="https://res.cloudinary.com/tomiwadev/video/upload/v1613831178/song_p5dr1p.mp3"
					type="audio/mpeg"
				/>
				Your browser does not support the audio element.
			</audio>
		</main>
	);
}
