type TileProps = {
  currentContent: 'X' | 'O' | ''
  cellIndex: number
  handleTileClick: (cellIndex: number) => void
  isGameOver: boolean
}

export function Tile(props: TileProps) {
  const { cellIndex, currentContent, handleTileClick } = props

  return (
    <div key={cellIndex}
      className="cell"
      onClick={() => handleTileClick(cellIndex)}
    >
      {currentContent}
    </div>
  )
}