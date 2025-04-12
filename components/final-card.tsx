"use client";

import { motion } from "framer-motion";
import { Heart, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FinalCardProps {
	onReset: () => void;
}

export default function FinalCard({ onReset }: FinalCardProps) {
	return (
		<div className="relative w-full h-[300px] flex items-center justify-center">
			{/* Background cards for stack effect */}
			<div className="absolute w-[90%] h-[90%] bg-white rounded-2xl shadow-sm border border-rose-100 transform rotate-[-2deg] translate-x-2 translate-y-2"></div>
			<div className="absolute w-[95%] h-[95%] bg-white rounded-2xl shadow-sm border border-rose-100 transform rotate-[1deg] translate-x-[-1px] translate-y-1"></div>

			{/* Main card with final message */}
			<motion.div
				className="absolute w-full h-full rounded-2xl p-6 flex flex-col"
				initial={{ opacity: 0, scale: 0.8 }}
				animate={{ opacity: 1, scale: 1 }}
				transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
			>
				<div className="flex flex-col items-center justify-between h-full">
					<div className="flex justify-center">
						<Heart className="text-rose-500 h-10 w-10 fill-rose-500" />
					</div>

					<div className="flex-grow flex items-center justify-center">
						<p className="text-xl text-center font-medium text-gray-800">
							Now you see that distance is just a mindset, you're a lot more closer to
							our hearts than you imagine
						</p>
					</div>

					<Button
						onClick={onReset}
						className="bg-rose-500 hover:bg-rose-600 text-white flex items-center gap-2 mt-4"
					>
						<RefreshCw className="h-4 w-4" />
						Start Over
					</Button>
				</div>
			</motion.div>
		</div>
	);
}
