 Real-Time Collaborative Editor

A real-time collaborative text editor built with React, TipTap, TailwindCSS, and Socket.io. Multiple users can edit the same document simultaneously with live updates and user-specific highlights. 

This project demonstrates how to implement real-time collaboration using WebSockets and a rich text editor. It supports multiple users working on the same document at the same time with visible distinctions for each user's edits and identity.

![Screenshot](https://raw.githubusercontent.com/amannegidev/aman-negi-wasserstoff-FrontEndInternTask/refs/heads/main/Screenshot%202025-05-13%20094834.png)


* Features

- Rich text editing with support for formatting, images, links, lists, and more
- Real-time collaboration using WebSockets
- Unique usernames for each user session
- Live user color indicators and name display
- Responsive and minimal UI using TailwindCSS

# Demo

- Live demo: [component-library-sdk-ohkw-pj48s9s4h.vercel.app](https://aman-negi-wasserstoff-front-end-intern-task.vercel.app/)
> Open in multiple browser tabs or windows to see real-time collaboration in action.

# Tech Stack

- Frontend: React, TipTap, TailwindCSS
- Real-time Backend: Node.js with Socket.io
- Deployment: Vercel

# Installation

Clone the repository and install dependencies:
```bash
git clone https://github.com/amannegidev/aman-negi-wasserstoff-FrontEndInternTask.git
cd collab-editor
npm install
npm run dev
