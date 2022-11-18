import { useRef, useState } from 'react'

import { SelectionBackground, X } from 'phosphor-react'

import type { NotesType } from 'types/notes'

import { setStorageItem } from 'utils'

import * as S from './styles'

type PropsType = {
  id: string
  onClose: () => void
  randomColor: string
  position: number
  existingNotes: Array<NotesType>
  text: string
}

const StickyNote = ({
  id,
  onClose,
  randomColor,
  position,
  existingNotes,
  text,
}: PropsType) => {
  const [shouldAllowMove, setShouldAllowMove] = useState(false)
  const [inputValue, setInputValue] = useState<string>(text || '')
  const [dx, setDx] = useState(0)
  const [dy, setDy] = useState(0)
  const stickyNoteRef = useRef<HTMLDivElement | null>(null)

  const handleMouseDown = (
    event: React.MouseEvent<HTMLHeadElement, MouseEvent>
  ): void => {
    if (!stickyNoteRef.current) return

    setShouldAllowMove(true)
    const dimensions = stickyNoteRef.current.getBoundingClientRect()

    setDx(event.clientX - dimensions.x)
    setDy(event.clientY - dimensions.y)
  }

  const handleMouseMove = (
    event: React.MouseEvent<HTMLHeadElement, MouseEvent>
  ): void => {
    if (!shouldAllowMove || !stickyNoteRef.current) return

    const x = event.clientX - dx
    const y = event.clientY - dy

    stickyNoteRef.current.style.left = x + 'px'
    stickyNoteRef.current.style.top = y + 'px'

    if (x <= 80 && y <= 80) {
      stickyNoteRef.current.style.backgroundColor = 'red'
    } else {
      stickyNoteRef.current.style.backgroundColor = 'white'
    }

    if (x <= 50 && y <= 50) {
      onClose()
    }
  }

  const handleMouseUp = (): void => {
    setShouldAllowMove(false)
  }

  const handleInputChange = (value: string): void => {
    setInputValue(value)

    const updatedNotes = existingNotes.map((item: NotesType) => {
      if (item.id === id) {
        item.text = value
      }

      return item
    })

    setStorageItem('notes', updatedNotes)
  }

  const bringToFront = (): void => {
    if (!stickyNoteRef.current) return

    const stickyNotes = document.querySelectorAll<HTMLElement>('.sticky-note')
    stickyNotes.forEach((note) => {
      note.style.zIndex = '0'
    })

    const zIndex = Number(stickyNoteRef.current.style.zIndex)
    stickyNoteRef.current.style.zIndex = `${zIndex + 1}`
  }

  return (
    <S.StickyNote
      ref={stickyNoteRef}
      position={position}
      className="sticky-note"
    >
      <S.StickyNoteHeader
        randomColor={randomColor}
        onMouseDown={(event) => handleMouseDown(event)}
        onMouseMove={(event) => handleMouseMove(event)}
        onMouseUp={handleMouseUp}
      >
        <S.StickyNoteTitle>Sticky Note</S.StickyNoteTitle>

        <S.BringToFrontAction
          onClick={bringToFront}
          aria-label="Bring to front"
        >
          <SelectionBackground size={16} />
        </S.BringToFrontAction>

        <S.CloseAction onClick={onClose} aria-label="Close sticky note">
          <X size={16} />
        </S.CloseAction>
      </S.StickyNoteHeader>

      <S.Textarea
        name={`text-area-${id}`}
        id={`text-area-${id}`}
        placeholder="Add your note"
        cols={30}
        rows={10}
        value={inputValue}
        onChange={(e) => handleInputChange(e.target.value)}
      />
    </S.StickyNote>
  )
}

export { StickyNote }
