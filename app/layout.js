"use client";
import "./globals.css";


/*export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};*/

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>Title</title>
        <meta name='description' content='Description' />
      </head>
      <body className={`${inter.className} max-w-[1580px] mx-auto`}>
        
      </body>
    </html>
  );
}