import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
	title: 'Create Next App',
	description: 'Generated by create next app',
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html className="bg-[url('https://upload.wikimedia.org/wikipedia/en/thumb/a/a7/Google_Homepage.PNG/1200px-Google_Homepage.PNG')]" lang="en">
			<body className={inter.className}>
				<div className="relative">
					{children}
					<p className="text-black/20 absolute bottom-0 left-1/2 transform -translate-x-1/2 py-5 text-sm text-center  ">(Made with ❤️ by Ebaa)</p>
				</div>
			</body>
		</html>
	)
}
