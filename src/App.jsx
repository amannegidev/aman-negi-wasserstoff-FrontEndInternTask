import { useState } from 'react'
import Editor from './components/Editor'
import Login from './components/Login'

export default function App() {
  const [username, setUsername] = useState('')
  const [content, setContent] = useState('<p>Start collaborating!</p>')

 return (
  <div className="min-h-screen bg-amber-50 px-4 py-6">
    {!username ? (
      <Login onLogin={setUsername} />
    ) : (
      <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden mt-4">
        <div className="px-6 py-4 border-b flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
          <h1 className="text-2xl font-semibold text-gray-800 tracking-tight">
             Live Collaboration Editor
          </h1>
          <div className="flex items-center gap-2">
   
              <span className="text-black bg-green-300 font-semibold mr-4 ring-1 py-1 px-4 rounded">{username}</span> 
            
          </div>
        </div>

        <div className="p-6">
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