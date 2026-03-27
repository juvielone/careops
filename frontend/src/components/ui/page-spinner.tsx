type PageSpinnerProps = {
  label?: string
}

export function PageSpinner({ label = "Loading..." }: PageSpinnerProps) {
  return (
    <div
      className="min-h-screen w-full bg-background text-foreground flex items-center justify-center"
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <div className="flex flex-col items-center gap-3">
        <div
          className="h-10 w-10 rounded-full border-4 border-muted border-t-primary animate-spin"
          aria-hidden="true"
        />
        <span className="text-sm text-muted-foreground">{label}</span>
      </div>
    </div>
  )
}

