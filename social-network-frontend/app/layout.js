// app/layout.js
import './globals.css'; // optional

export const metadata = {
  title: 'Social Network',
  description: 'Connect and share with friends',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
