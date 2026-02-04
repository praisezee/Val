import { useState, useEffect } from "react";
import "./App.css";

function App() {
	const [noCount, setNoCount] = useState(0);
	const [yesPressed, setYesPressed] = useState(false);
	const [noButtonPosition, setNoButtonPosition] = useState({ top: 0, left: 0 });
	const [isHoveringNo, setIsHoveringNo] = useState(false);

	const handleNoClick = () => {
		setNoCount(noCount + 1);
		moveNoButton();
	};

	const moveNoButton = () => {
		const x = Math.random() * (window.innerWidth - 100);
		const y = Math.random() * (window.innerHeight - 50);
		setNoButtonPosition({ top: y, left: x });
		setIsHoveringNo(true);
	};

	const handleYesClick = () => {
		setYesPressed(true);
		const phoneNumber = "2348114617060";
		const message = encodeURIComponent("Yes, I'll be your Val! ❤️");
		setTimeout(() => {
			window.location.href = `https://wa.me/${phoneNumber}?text=${message}`;
		}, 2000);
	};

	const getNoButtonText = () => {
		const phrases = [
			"No",
			"Are you sure?",
			"Really sure?",
			"Think again!",
			"Last chance!",
			"Surely not?",
			"You might regret this!",
			"Give it another thought!",
			"Are you absolutely sure?",
			"This could be a mistake!",
			"Have a heart!",
			"Don't be so cold!",
			"Change of heart?",
			"Wouldn't you reconsider?",
			"Is that your final answer?",
			"You're breaking my heart ;(",
		];
		return phrases[Math.min(noCount, phrases.length - 1)];
	};

	const yesButtonSize = noCount * 20 + 16;

	// Floating hearts logic
	const [hearts, setHearts] = useState<
		{ id: number; left: string; size: string; duration: string }[]
	>([]);

	useEffect(() => {
		const interval = setInterval(() => {
			const newHeart = {
				id: Date.now(),
				left: `${Math.random() * 100}%`,
				size: `${Math.random() * (2 - 1) + 1}rem`,
				duration: `${Math.random() * (15 - 5) + 5}s`,
			};
			setHearts((prev) => [...prev.slice(-20), newHeart]);
		}, 1000);
		return () => clearInterval(interval);
	}, []);

	return (
		<div className="proposal-container">
			<div className="heart-bg">
				{hearts.map((heart) => (
					<span
						key={heart.id}
						className="heart"
						style={{
							left: heart.left,
							fontSize: heart.size,
							animationDuration: heart.duration,
						}}>
						❤
					</span>
				))}
			</div>

			{yesPressed ?
				<>
					<img
						src="https://media.tenor.com/gU_Pb_76pMQAAAAi/tkthao219-bubududu.gif"
						alt="Success"
						className="valentine-image"
					/>
					<h1>Yay!!! Ajike said YES! ❤️</h1>
					<p>Redirecting to WhatsApp...</p>
				</>
			:	<>
					<img
						src="/valentine.png"
						alt="Be my Val?"
						className="valentine-image"
					/>
					<h1>Ajike, will you be my Valentine?</h1>
					<div className="button-group">
						<button
							className="btn btn-yes"
							style={{ fontSize: `${yesButtonSize}px` }}
							onClick={handleYesClick}>
							Yes
						</button>
						<button
							className="btn btn-no"
							style={
								isHoveringNo ?
									{
										position: "fixed",
										top: `${noButtonPosition.top}px`,
										left: `${noButtonPosition.left}px`,
										zIndex: 100,
									}
								:	{}
							}
							onMouseEnter={moveNoButton}
							onClick={handleNoClick}>
							{getNoButtonText()}
						</button>
					</div>
				</>
			}
		</div>
	);
}

export default App;
