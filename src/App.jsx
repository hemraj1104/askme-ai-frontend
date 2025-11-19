import React from 'react'
import ChatWindow from './components/ChatWindow'


export default function App() {
return (
<div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
<div className="w-full max-w-3xl bg-white shadow-lg rounded-2xl p-6">
<header className="mb-4">
<h1 className="text-2xl font-semibold">AskMe.ai — Chat (React + GPT‑5.1)</h1>
<p className="text-sm text-slate-500">Powered by OpenAI GPT‑5.1</p>
</header>
<ChatWindow />
</div>
</div>
)
}