import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, CheckCircle, XCircle, Loader, Trophy, LogOut } from 'lucide-react';
import { socket } from '../socket';

const colors = [
    { bg: "bg-red-500", border: "border-red-700", icon: "🔺" },
    { bg: "bg-blue-500", border: "border-blue-700", icon: "🔷" },
    { bg: "bg-yellow-500", border: "border-yellow-700", icon: "🟡" },
    { bg: "bg-green-500", border: "border-green-700", icon: "🟩" }
];

const PlayerView = () => {
    const [gameState, setGameState] = useState('login'); // login, waiting, reading, answering, answered, result, game_over
    const [name, setName] = useState('');
    const [score, setScore] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [isCorrect, setIsCorrect] = useState(null);
    const [rank, setRank] = useState(0);
    const [questionText, setQuestionText] = useState("");

    useEffect(() => {
        // Connect automatically (the socket.js handles autoConnect=true now)
        if (!socket.connected) socket.connect();

        // Auto-join if name exists
        const savedName = localStorage.getItem('shomrat_player_name');
        if (savedName) {
            setName(savedName);
            console.log("Auto-rejoining as:", savedName);
            socket.emit('player_join', savedName);
        }

        const handleJoined = (status) => {
            if (status === 'playing') setGameState('waiting');
            else setGameState('waiting');
        };

        const handleStarted = () => {
            setGameState('waiting');
            setScore(0);
        };

        const handlePrepare = () => {
            setGameState('reading');
            setSelectedOption(null);
            setIsCorrect(null);
            // Reset question text until we get the sync event
            setQuestionText("");
        };

        const handleSyncQuestion = (text) => {
            setQuestionText(text);
        };

        const handleOpenVote = () => {
            setGameState('answering');
        };

        const handleResults = (wasCorrect) => {
            setIsCorrect(wasCorrect);
            setGameState('result');
            if (wasCorrect) setScore(s => s + 100);
        };

        const handleGameOver = (leaderboard) => {
            setGameState('game_over');
            // SYNC SCORE FROM SERVER (Fixes the 0 vs 260 bug)
            const myData = leaderboard.find(p => p.id === socket.id);
            if (myData) {
                setScore(myData.score);
            }
            const myRank = leaderboard.findIndex(p => p.id === socket.id) + 1;
            setRank(myRank);
        };

        socket.on('joined_successfully', handleJoined);
        socket.on('game_started', handleStarted);
        socket.on('prepare_round', handlePrepare);
        socket.on('sync_question_text', handleSyncQuestion); // Listen for question text
        socket.on('open_voting', handleOpenVote);
        socket.on('round_result', handleResults);
        socket.on('game_ended', handleGameOver);

        // RESET Logic: Clear Storage & Reload Page!
        socket.on('game_reset', () => {
            localStorage.removeItem('shomrat_player_name');
            window.location.reload(); // Hard Reset for Clean State
        });

        return () => {
            socket.off('joined_successfully', handleJoined);
            socket.off('game_started', handleStarted);
            socket.off('prepare_round', handlePrepare);
            socket.off('sync_question_text', handleSyncQuestion);
            socket.off('open_voting', handleOpenVote);
            socket.off('round_result', handleResults);
            socket.off('game_ended', handleGameOver);
            socket.off('game_reset');
        };
    }, []);

    const handleJoin = () => {
        if (!name.trim()) return;
        localStorage.setItem('shomrat_player_name', name.trim());
        socket.emit('player_join', name);
        setGameState('waiting');
    };

    const handleLogout = () => {
        localStorage.removeItem('shomrat_player_name');
        setName('');
        setGameState('login');
        window.location.reload();
    }

    const handleAnswer = (idx) => {
        setSelectedOption(idx);
        socket.emit('player_answer', { answerIdx: idx, timeLeft: 0 });
        setGameState('answered');
    };

    if (gameState === 'login') {
        return (
            <div className="min-h-screen bg-brand-blue flex flex-col items-center justify-center p-6 text-center">
                <div className="bg-white p-8 rounded-2xl w-full max-w-sm shadow-2xl">
                    <h1 className="text-3xl font-black text-brand-black mb-6">הצטרפות למשחק</h1>
                    <input
                        type="text"
                        placeholder="הכנס שם..."
                        className="w-full p-4 border-2 border-gray-200 rounded-xl mb-4 text-xl text-center font-bold outline-none focus:border-brand-yellow"
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                    <button onClick={handleJoin} className="w-full bg-brand-black text-white py-4 rounded-xl text-xl font-black shadow-lg hover:scale-105 transition-transform">GO!</button>
                </div>
            </div>
        );
    }

    if (gameState === 'waiting') {
        return (
            <div className="min-h-screen bg-brand-blue flex flex-col items-center justify-center p-6 text-white text-center">
                <Loader className="animate-spin mb-4" size={48} />
                <h2 className="text-3xl font-bold">המשחק יתחיל בקרוב...</h2>
                <p className="text-xl opacity-80 mt-2">את/ה מחובר/ת בשם: {name}</p>
                <button onClick={handleLogout} className="mt-8 flex items-center gap-2 text-white/50 hover:text-white transition-colors"><LogOut size={20} /><span>התנתק (יציאה)</span></button>
            </div>
        );
    }

    if (gameState === 'reading') {
        return (
            <div className="min-h-screen bg-brand-blue flex flex-col items-center justify-center p-6 text-white text-center">
                <Loader className="animate-spin mb-4" size={48} />
                <h2 className="text-3xl font-bold">הביטו במסך...</h2>
                <p className="text-xl opacity-80 mt-2">{questionText || "השאלה מוצגת כעת"}</p>
            </div>
        );
    }

    if (gameState === 'answering') {
        return (
            <div className="min-h-screen bg-gray-900 p-4 flex flex-col gap-4">
                {/* Question Text Display */}
                {questionText && (
                    <div className="bg-gray-800 text-white p-4 rounded-xl text-center text-lg font-bold border-2 border-gray-700 shadow-md">
                        {questionText}
                    </div>
                )}
                <div className="flex-1 grid grid-cols-2 gap-4">
                    {colors.map((c, i) => (
                        <button
                            key={i}
                            onClick={() => handleAnswer(i)}
                            className={`${c.bg} rounded-2xl shadow-inner flex items-center justify-center text-6xl active:scale-95 transition-transform border-b-8 ${c.border} h-full`}
                        >
                            {c.icon}
                        </button>
                    ))}
                </div>
            </div>
        );
    }

    if (gameState === 'answered') {
        return (
            <div className="min-h-screen bg-brand-dark-blue flex flex-col items-center justify-center p-6 text-white text-center">
                <div className="bg-white/10 p-8 rounded-full mb-6 animate-pulse"><CheckCircle size={64} /></div>
                <h2 className="text-3xl font-bold">התשובה נקלטה!</h2>
                <p className="text-xl mt-4">ממתינים לאחרים...</p>
            </div>
        );
    }

    if (gameState === 'result') {
        return (
            <div className={`min-h-screen flex flex-col items-center justify-center p-6 text-white text-center ${isCorrect ? 'bg-green-500' : 'bg-red-500'}`}>
                {isCorrect ? (
                    <>
                        <h2 className="text-5xl font-black mb-4">יש!</h2>
                        <span className="text-9xl mb-8">😎</span>
                        <p className="text-2xl font-bold">+100 נקודות</p>
                    </>
                ) : (
                    <>
                        <h2 className="text-5xl font-black mb-4">אוי לא...</h2>
                        <span className="text-9xl mb-8">😢</span>
                        <p className="text-2xl font-bold">לא להתייאש!</p>
                    </>
                )}
            </div>
        );
    }

    if (gameState === 'game_over') {
        return (
            <div className="min-h-screen bg-brand-yellow flex flex-col items-center justify-center p-6 text-brand-black text-center">
                <Trophy size={64} className="mb-4 text-brand-blue" />
                <h2 className="text-4xl font-black mb-2">המשחק נגמר!</h2>
                <p className="text-2xl font-bold">המקום שלך:</p>
                <div className="text-8xl font-black font-hand my-4">{rank}</div>
                <p className="text-xl font-bold">ניקוד סופי: {score}</p>
                <button onClick={handleLogout} className="mt-8 bg-black text-white px-6 py-3 rounded-full font-bold">משחק חדש</button>
            </div>
        )
    }

    return null;
};

export default PlayerView;
