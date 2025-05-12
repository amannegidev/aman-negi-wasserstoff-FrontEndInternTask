// src/extensions/ResizableImage.js
import { Node } from '@tiptap/core'

export const ResizableImage = Node.create({
  name: 'resizableImage',

  group: 'block',

  inline: false,

  addAttributes() {
    return {
      src: {
        default: null,
      },
      alt: {
        default: null,
      },
      width: {
        default: 'auto',
      },
      height: {
        default: 'auto',
      },
    }
  },

  parseHTML() {
    return [
      {
        tag: 'img',
      },
    ]
  },

  renderHTML({ HTMLAttributes }) {
    return ['img', HTMLAttributes]
  },

  addCommands() {
    return {
      setImage: (src, alt, width = 'auto', height = 'auto') => ({ chain }) => {
        return chain().setNode('resizableImage', { src, alt, width, height }).run()
      },
      updateImageSize: (width, height) => ({ chain }) => {
        return chain().updateAttributes('resizableImage', { width, height }).run()
      },
    }
  },
})
