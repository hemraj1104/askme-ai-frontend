import React, { useState, useRef } from 'react'

export default function ChatWindow() {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: "Hey! I'm AskMe.ai — Ask me anything!" }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef(null)

  const addMessage = (role, content) => {
    setMessages(prev => [...prev, { role, content }])
    setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: 'smooth' }), 50)
  }

  const sendMessage = async () => {
    if (!input.trim()) return

    const userText = input.trim()
    addMessage('user', userText)
    setInput('')
    setLoading(true)

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, { role: 'user', content: userText }]
        })
      })

      const data = await res.json()
      addMessage('assistant', data.reply)
    } catch (err) {
      addMessage('assistant', 'Network error. Please try again.')
    }

    setLoading(false)
  }

  return (
    <div className="flex flex-col h-[60vh]">
      <div className="flex-1 overflow-auto p-4 space-y-3 bg-slate-100 border rounded-lg">
        {messages.map((m, i) => (
          <div key={i} className={`max-w-[80%] ${m.role === 'user' ? 'ml-auto text-right' : ''}`}>
            <div className={`px-4 py-2 rounded-lg inline-block ${m.role === 'user' ? 'bg-indigo-600 text-white' : 'bg-white border'}`}>
              {m.content}
            </div>
          </div>
        ))}
        <div ref={bottomRef}></div>
      </div>

      <div className="mt-3 flex gap-3">
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && sendMessage()}
          className="flex-1 p-3 border rounded-lg"
          placeholder="Ask something..."
          disabled={loading}
        />

        <button
          onClick={sendMessage}
          disabled={loading}
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg disabled:opacity-60"
        >
          {loading ? 'Thinking…' : 'Send'}
        </button>
      </div>
    </div>
  )
}
