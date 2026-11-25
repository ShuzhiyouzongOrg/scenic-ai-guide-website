interface LotusProps {
  className?: string
  loading?: 'eager' | 'lazy'
}

export function LotusOrnament({ className, loading }: LotusProps) {
  return <img className={className} alt="" width={280} height={136} decoding="async" loading={loading}
    src={`${import.meta.env.BASE_URL}assets/cultural/route/gilt-lotus-small.webp`} />
}
