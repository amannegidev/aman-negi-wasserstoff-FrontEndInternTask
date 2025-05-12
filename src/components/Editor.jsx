import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { FontSize } from '../extention/FontSize'
import Link from '@tiptap/extension-link'
import TextAlign from '@tiptap/extension-text-align'
import Underline from '@tiptap/extension-underline' 
import TextStyle from '@tiptap/extension-text-style'
import Color from '@tiptap/extension-color'
import Highlight from '@tiptap/extension-highlight'
import { useEffect, useRef, useState } from 'react'
import { mergeAttributes } from '@tiptap/core'
import { Image } from '@tiptap/extension-image'
import '../index.css'


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faBold, faItalic, faUnderline, faAlignLeft, faAlignCenter, faAlignRight,
  faListUl, faListOl, faQuoteRight, faLink, faImage, faUndo, faRedo,
  faDeleteLeft, faDownload, faPalette, faHighlighter
} from '@fortawesome/free-solid-svg-icons'




// Custom Image extension with width/height attributes
const CustomImage = Image.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      width: {
        default: 'auto',
        parseHTML: element => element.getAttribute('width') || 'auto',
      },
      height: {
        default: 'auto',
        parseHTML: element => element.getAttribute('height') || 'auto',
      },
    }
  },
  renderHTML({ HTMLAttributes }) {
    return ['img', mergeAttributes(HTMLAttributes, { class: 'resizable' })]
  },
})

export default function Editor({ username }) {
  const ws = useRef(null)
  const [color, setColor] = useState('#000000')
  const [bgColor, setBgColor] = useState('#FFFF00')
  const [lastEditor, setLastEditor] = useState(null)

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bulletList: { keepMarks: true },
        orderedList: { keepMarks: true },
        blockquote: true,
        history: true,
      }),
      Underline,
      TextStyle,
      Color,
      FontSize,
      Highlight.configure({ multicolor: true }),
      Link.configure({ openOnClick: false, autolink: true, linkOnPaste: true }),
      CustomImage.configure({ inline: false, allowBase64: true }),
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
    ],
    content: '<p>Start collaborating! 🚀</p>',
    editorProps: {
      attributes: {
        class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl focus:outline-none border p-4 rounded min-h-[300px] bg-white max-w-full prose-img:max-w-full prose-img:h-auto',
      },
    },
    onUpdate: ({ editor }) => {
      if (ws.current?.readyState === WebSocket.OPEN) {
        ws.current.send(JSON.stringify({
          type: 'content-update',
          content: editor.getHTML(),
          username,
        }))
      }
    }
  })

  // WebSocket connection
// Update the useEffect WebSocket handling
useEffect(() => {
  if (!editor) return;

  // Create WebSocket only if not already exists
  if (!ws.current || ws.current.readyState === WebSocket.CLOSED) {
    const socket = new WebSocket('ws://localhost:3001');
    ws.current = socket;

    socket.onopen = () => {
      socket.send(JSON.stringify({ type: 'join', username }));
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === 'content-update' && data.username !== username) {
        editor.commands.setContent(data.content, false);
        setLastEditor(data.username);
      }
    };

    socket.onerror = (err) => {
      console.error('WebSocket error:', err);
    };

    socket.onclose = (event) => {
      if (!event.wasClean) {
        console.log('Unexpected disconnect, reconnecting...');
        setTimeout(() => {
          if (editor && !ws.current) {
            ws.current = new WebSocket('ws://localhost:3001');
          }
        }, 1000);
      }
    };
  }

  return () => {
    // Only close if component is actually unmounting
    if (ws.current && ws.current.readyState === WebSocket.OPEN) {
      ws.current.close(1000, 'Component unmounting');
    }
    ws.current = null;
  };
}, [editor, username]);

  // Insert image from device
  const addImageFromDevice = () => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = 'image/*'
    input.onchange = () => {
      const file = input.files?.[0]
      if (!file) return
      const reader = new FileReader()
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          editor.chain().focus().insertContent({
            type: 'image',
            attrs: {
              src: reader.result,
              alt: file.name,
              width: 'auto',
            },
          }).run()
        }
      }
      reader.readAsDataURL(file)
    }
    input.click()
  }

  // Resize selected image
  const resizeImage = (width) => {
    const pos = editor.state.selection.from
    const node = editor.state.doc.nodeAt(pos)
    if (node?.type.name === 'image') {
      editor.chain().focus().updateAttributes('image', { width }).run()
    }
  }

  // Reset content
  const resetContent = () => {
    editor.chain().focus().clearContent().setContent('<p>Start collaborating! 🚀</p>').run()
  }

  // Save content as HTML file
  const saveToFile = () => {
    const html = editor.getHTML()
    const blob = new Blob([html], { type: 'text/html' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'document.html'
    link.click()
    URL.revokeObjectURL(url)
  }

  // Reusable toolbar button
 const toolbarButton = (label, onClick, isActive = false) => (
  <button
    onClick={onClick}
    className={`px-5 py-2 rounded-md text-sm font-medium transition-all ${
      isActive
        ? 'bg-indigo-600 text-white shadow'
        : 'bg-white hover:bg-gray-200 text-gray-800'
    }`}
  >
    {label}
  </button>
);
  // Set font size
  const setFontSize = (size) => {
    editor.chain().focus().setFontSize(size).run()
    editor.commands.updateAttributes('listItem', { style: `font-size: ${size};` })
  }

return (
  <div className="editor-container max-w-7xl mx-auto px-4 py-10 bg-blue-100">
    {/* <h2 className="text-4xl font-[ubuntu] text-center text-gray-800 mb-8 tracking-tight font-display">
       Collaborative Editor
    </h2> */}

   {editor && (
  <div className="toolbar overflow-x-auto flex flex-wrap gap-3 bg-blue-100 border border-gray-200 p-4 rounded-xl shadow mb-6">

    {toolbarButton(<FontAwesomeIcon icon={faBold} />, () => editor.chain().focus().toggleBold().run(), editor.isActive('bold'))}
    {toolbarButton(<FontAwesomeIcon icon={faItalic} />, () => editor.chain().focus().toggleItalic().run(), editor.isActive('italic'))}
    {toolbarButton(<FontAwesomeIcon icon={faUnderline} />, () => editor.chain().focus().toggleUnderline().run(), editor.isActive('underline'))}

    <div className="flex items-center gap-2 bg-white rounded px-4">
      <FontAwesomeIcon icon={faPalette} className="text-gray-700" />
      <input
        type="color"
        value={color}
        onChange={(e) => {
          setColor(e.target.value);
          editor.chain().focus().setColor(e.target.value).run();
        }}
        className="w-6 h-6 border-none cursor-pointer rounded"
      />
    </div>

    <div className="flex items-center gap-2 bg-white rounded px-4">
      <FontAwesomeIcon icon={faHighlighter} className="text-gray-700" />
      <input
        type="color"
        value={bgColor}
        onChange={(e) => {
          setBgColor(e.target.value);
          editor.chain().focus().setHighlight({ color: e.target.value }).run();
        }}
        className="w-6 h-6 border-none cursor-pointer rounded"
      />
    </div>

    {toolbarButton(<FontAwesomeIcon icon={faAlignLeft} />, () => editor.chain().focus().setTextAlign('left').run())}
    {toolbarButton(<FontAwesomeIcon icon={faAlignCenter} />, () => editor.chain().focus().setTextAlign('center').run())}
    {toolbarButton(<FontAwesomeIcon icon={faAlignRight} />, () => editor.chain().focus().setTextAlign('right').run())}

    <select
      onChange={(e) => setFontSize(e.target.value)}
      defaultValue=""
      className="text-sm border border-gray-300 rounded-md px-3 py-1 bg-white"
    >
      <option disabled value="">Font Size</option>
      {[12, 14, 16, 18, 24, 32, 40, 48, 64, 72].map(size => (
        <option key={size} value={`${size}px`}>{size}px</option>
      ))}
    </select>

    {toolbarButton(<FontAwesomeIcon icon={faListUl} />, () => editor.chain().focus().toggleBulletList().run(), editor.isActive('bulletList'))}
    {toolbarButton(<FontAwesomeIcon icon={faListOl} />, () => editor.chain().focus().toggleOrderedList().run(), editor.isActive('orderedList'))}
    {toolbarButton(<FontAwesomeIcon icon={faQuoteRight} />, () => editor.chain().focus().toggleBlockquote().run(), editor.isActive('blockquote'))}

    <button
      onClick={() => {
        const url = prompt("Enter URL");
        if (url) editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
      }}
      className="px-3 py-1 bg-white hover:bg-blue-200 text-blue-800 rounded-md shadow"
    >
      <FontAwesomeIcon icon={faLink} />
    </button>

    {toolbarButton(<FontAwesomeIcon icon={faImage} />, addImageFromDevice)}
    {toolbarButton(<FontAwesomeIcon icon={faUndo} />, () => editor.chain().focus().undo().run())}
    {toolbarButton(<FontAwesomeIcon icon={faRedo} />, () => editor.chain().focus().redo().run())}
    {toolbarButton(<FontAwesomeIcon icon={faDeleteLeft} />, resetContent)}
    {toolbarButton(<FontAwesomeIcon icon={faDownload} /> ,saveToFile)}

    {editor.isActive('image') && (
      <select
        onChange={(e) => resizeImage(e.target.value)}
        defaultValue=""
        className="text-sm border border-gray-300 rounded-md px-3 py-1 bg-white"
      >
        <option disabled value="">Resize Image</option>
        {['100px', '200px', '300px', '500px', '100%'].map(size => (
          <option key={size} value={size}>{size}</option>
        ))}
      </select>
    )}
  </div>
)}


    <div className="border border-gray-300 rounded-xl p-6 bg-white shadow-sm min-h-[300px]">
      <EditorContent editor={editor} />
    </div>

    {lastEditor && (
      <p className="text-sm text-gray-500 mt-4 text-center font-medium tracking-wide">
        Last edit by <span className="font-semibold text-black">{lastEditor}</span>
      </p>
    )}
  </div>
);


}
