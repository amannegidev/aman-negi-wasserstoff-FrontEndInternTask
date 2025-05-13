 Real-Time Collaborative Editor

A real-time collaborative text editor built with React, TipTap, TailwindCSS, and Socket.io. Multiple users can edit the same document simultaneously with live updates and user-specific highlights. 

This project demonstrates how to implement real-time collaboration using WebSockets and a rich text editor. It supports multiple users working on the same document at the same time with visible distinctions for each user's edits and identity.

[![Banner](https://github.com/user-attachments/assets/7f59ac07-363b-420a-9c31-5033c27aa3cc.jpeg)
](https://private-user-images.githubusercontent.com/202912280/443037878-302c3169-3cf8-408d-8070-3387fdee738d.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3NDcxMTExMDQsIm5iZiI6MTc0NzExMDgwNCwicGF0aCI6Ii8yMDI5MTIyODAvNDQzMDM3ODc4LTMwMmMzMTY5LTNjZjgtNDA4ZC04MDcwLTMzODdmZGVlNzM4ZC5wbmc_WC1BbXotQWxnb3JpdGhtPUFXUzQtSE1BQy1TSEEyNTYmWC1BbXotQ3JlZGVudGlhbD1BS0lBVkNPRFlMU0E1M1BRSzRaQSUyRjIwMjUwNTEzJTJGdXMtZWFzdC0xJTJGczMlMkZhd3M0X3JlcXVlc3QmWC1BbXotRGF0ZT0yMDI1MDUxM1QwNDMzMjRaJlgtQW16LUV4cGlyZXM9MzAwJlgtQW16LVNpZ25hdHVyZT0zNWVmZjA4MDIyNWY4YTlkZDhhZDNjZTIyNWNkMGUzOTUyNDdlYjc2ZGQ5NDI3MjdkYjM4MjgxYTU2ZjUzYmU4JlgtQW16LVNpZ25lZEhlYWRlcnM9aG9zdCJ9.7e3bHrISfugI3uCzXE6-G0z3kIcJEJnQ86FOhuRx9SY)

* Features

- Rich text editing with support for formatting, images, links, lists, and more
- Real-time collaboration using WebSockets
- Unique usernames for each user session
- Live user color indicators and name display
- Responsive and minimal UI using TailwindCSS

# Demo

- Live demo: (https://aman-negi-wasserstoff-front-end-intern-task-ymj8.vercel.app/)

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
