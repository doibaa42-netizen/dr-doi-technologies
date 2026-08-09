import "./page.css";

export const metadata = {
  title: "Dr Doi Technologies",
  description:
    "Professional electrical, electronics, solar and technology services in Nakuru, Kenya.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
