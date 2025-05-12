import { Mark } from '@tiptap/core'

export const FontSize = Mark.create({
  name: 'fontSize',
  priority: 1000,

  addAttributes() {
    return {
      fontSize: {
        default: null,
        parseHTML: element => element.style.fontSize || null,
        renderHTML: attributes => {
          if (!attributes.fontSize) return {}
          return {
            style: `font-size: ${attributes.fontSize}`,
          }
        },
      },
    }
  },

  parseHTML() {
    return [
      {
        tag: 'span[style]',
        getAttrs: element => {
          const fontSize = element.style.fontSize
          return fontSize ? { fontSize } : false
        },
      },
    ]
  },

  renderHTML({ HTMLAttributes }) {
    return ['span', HTMLAttributes, 0]
  },

  addCommands() {
    return {
      setFontSize:
        fontSize =>
        ({ chain }) => {
          return chain().setMark(this.name, { fontSize }).run()
        },
    }
  },
})
