import { useEffect, useRef, useCallback } from 'react'

export function useCollaboration(content, setEditorContent, username) {
  const wsRef = useRef(null)

  useEffect(() => {
    if (wsRef.current) {
      // Prevent reconnecting if WebSocket already exists
      console.log('WebSocket already exists')
      return
    }

    const ws = new WebSocket('ws://localhost:3001')
    wsRef.current = ws

    ws.onopen = () => {
      console.log('WebSocket connected')
      ws.send(JSON.stringify({
        type: 'join',
        username,
        content,
      }))
    }

    ws.onmessage = (event) => {
      const message = JSON.parse(event.data)

      if (message.type === 'content-update' && message.username !== username) {
        setEditorContent(message.content)
      }
    }

    ws.onerror = (err) => {
      console.error('WebSocket error:', err)
    }

    ws.onclose = () => {
      console.log('WebSocket closed')
    }

    return () => {
      console.log('Closing WebSocket connection')
      ws.close() // Cleanup when component unmounts
    }
  }, [username, content, setEditorContent])

  const sendUpdate = useCallback((newContent) => {
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify({
        type: 'content-update',
        content: newContent,
        username,
      }))
    }
  }, [username])

  return { sendUpdate }
}
