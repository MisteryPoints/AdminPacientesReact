import { Moon, PawPrint, Sun } from 'lucide-react'

const Header = ({ tema, onAlternarTema }) => (
  <header className="sticky top-0 z-30 border-b border-zinc-200/70 bg-white/70 backdrop-blur-xl dark:border-zinc-800/70 dark:bg-zinc-950/70">
    <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
      <a href="/" className="flex items-center gap-2.5">
        <span className="grid size-9 place-items-center rounded-xl bg-linear-to-br from-indigo-500 to-violet-600 text-white shadow-lg shadow-indigo-500/25">
          <PawPrint className="size-5" aria-hidden />
        </span>
        <span className="text-lg font-semibold tracking-tight">
          Vet<span className="text-indigo-600 dark:text-indigo-400">Care</span>
        </span>
      </a>

      <button
        type="button"
        onClick={onAlternarTema}
        aria-label={
          tema === 'dark' ? 'Activar modo claro' : 'Activar modo oscuro'
        }
        title={tema === 'dark' ? 'Modo claro' : 'Modo oscuro'}
        className="grid size-10 cursor-pointer place-items-center rounded-xl border border-zinc-200 text-zinc-600 transition hover:bg-zinc-100 hover:text-zinc-900 focus-visible:ring-4 focus-visible:ring-indigo-500/20 focus-visible:outline-none dark:border-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-900 dark:hover:text-zinc-100"
      >
        {tema === 'dark' ? (
          <Sun className="size-5" />
        ) : (
          <Moon className="size-5" />
        )}
      </button>
    </div>
  </header>
)

export default Header
