type Props = {
  label: string
  count: number
  position: "left" | "right"
}

export default function SideZone({ label, count }: Props) {
  return (
    <div className="bg-gray-900 p-2 rounded text-xs">
      <div>{label}</div>
      <div className="text-center text-lg">{count}</div>
    </div>
  )
}