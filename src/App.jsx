import { useState } from 'react'
import Editor from './components/Editor'
import Login from './components/Login'

export default function App() {
  const [username, setUsername] = useState('')
  const [content, setContent] = useState('<p>Start collaborating!</p>')

 return (
 <div className="min-h-screen bg-amber-50 px-2 sm:px-4 py-4 sm:py-6">
  {!username ? (
    <Login onLogin={setUsername} />
  ) : (
    <div className="w-full max-w-5xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden mt-4">
      <div className="px-4 py-3 sm:px-6 sm:py-4 border-b flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
        <h1 className="text-xl sm:text-2xl font-semibold text-gray-800 tracking-tight">
          Live Collaboration Editor
        </h1>
        <div className="flex items-center gap-2">
          <span className="text-sm sm:text-base text-black bg-green-300 font-semibold ring-1 py-1 px-3 rounded">
            {username}
          </span>
        </div>
      </div>

      <div className="p-4 sm:p-6">
        <Editor
          username={username}
          content={content}
          onUpdate={setContent}
        />
      </div>
    </div>
  )}
</div>

);

}