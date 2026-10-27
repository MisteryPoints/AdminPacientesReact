const TECNOLOGIAS = ['React 19', 'Vite 8', 'Tailwind CSS 4']

const Footer = () => (
  <footer className="mt-20 border-t border-zinc-200 dark:border-zinc-800">
    <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-8 text-sm text-zinc-500 sm:flex-row sm:px-6 lg:px-8 dark:text-zinc-400">
      <p>
        Desarrollado por{' '}
        <span className="font-medium text-zinc-900 dark:text-zinc-100">
          DevPoint Víctor Tejada
        </span>
      </p>
      <ul
        className="flex flex-wrap justify-center gap-2"
        aria-label="Tecnologías"
      >
        {TECNOLOGIAS.map((tecnologia) => (
          <li
            key={tecnologia}
            className="rounded-full border border-zinc-200 bg-white px-3 py-1 text-xs font-medium dark:border-zinc-800 dark:bg-zinc-900"
          >
            {tecnologia}
          </li>
        ))}
      </ul>
    </div>
  </footer>
)

export default Footer
