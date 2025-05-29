'use client';
import { Inter, Source_Code_Pro } from "next/font/google";
import { usePathname, useRouter } from "next/navigation";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const sourcePro = Source_Code_Pro({
  variable: "--font-mono",
  subsets: ["latin"],
});

// Metadados movidos para um arquivo metadata.js separado pois não podem ser usados com "use client"
const defaultMetadata = {
  title: "Meu Projeto Next.js",
  description: "Um projeto moderno construído com Next.js, React e Tailwind CSS",
  keywords: ["next.js", "react", "javascript", "tailwind"],
};

export default function RootLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname();

  // Não mostrar a navbar na página inicial e nas páginas de autenticação
  const hideNavbar =
    pathname?.startsWith("/(auth)") ||
    pathname === "/";

  return (
    <html lang="pt-BR">      <body
        className={`${inter.variable} ${sourcePro.variable} antialiased`}
      >
        {!hideNavbar && (
          <header className="bg-[#2b4e4b] text-white shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  {/* Logo/Nome do Sistema */}
                  <button
                    onClick={() => router.push("/")}
                    className="flex items-center gap-2 hover:text-emerald-100 transition-colors"
                  >
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                      />
                    </svg>
                    <span className="text-xl font-bold">Gestão com Exelência</span>
                  </button>
                </div>

                {/* Botão Página Inicial */}
                <button
                  onClick={() => router.push("/")}
                  className="inline-flex items-center px-4 py-2 rounded-md text-sm font-medium bg-[#1a2f2e] hover:bg-[#142424] transition-colors"
                >
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                    />
                  </svg>
                  Página Inicial
                </button>
              </div>
            </div>
          </header>
        )}
        {children}
      </body>
    </html>
  );
}
