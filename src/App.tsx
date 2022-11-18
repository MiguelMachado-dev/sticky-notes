import { useState, useEffect } from 'react'

import { Trash } from 'phosphor-react'
import { v4 as uuidv4 } from 'uuid'

import { StickyNote } from 'components/StickyNotes'

import type { NotesType } from 'types/notes'

import {
  generateRandomHexColor,
  generateCardRandomPosition,
  setStorageItem,
  getStorageItem,
} from 'utils'

import * as S from './styles/app.styles'

function App() {
  const [notes, setNotes] = useState<Array<NotesType>>([])
  let hasLoaded = false

  useEffect(() => {
    const existingNotes = getStorageItem('notes')

    if (!hasLoaded && existingNotes) {
      setNotes(existingNotes)
      // eslint-disable-next-line react-hooks/exhaustive-deps
      hasLoaded = true
    }
  }, [])

  const addNote = (): void => {
    setNotes([
      ...notes,
      {
        id: uuidv4(),
        randomColor: generateRandomHexColor(),
        position: generateCardRandomPosition(),
        text: '',
      },
    ])

    setStorageItem('notes', [
      ...notes,
      {
        id: uuidv4(),
        randomColor: generateRandomHexColor(),
        position: generateCardRandomPosition(),
        text: '',
      },
    ])
  }

  const removeNote = (noteId: string): void => {
    const filteredNotes = notes.filter((item) => item.id !== noteId)
    setNotes(filteredNotes)
    setStorageItem('notes', filteredNotes)
  }

  return (
    <div className="App">
      <S.TrashWrapper id="trash" title="Drag sticky note here to delete it.">
        <Trash size={32} color="red" />
      </S.TrashWrapper>

      <S.CreateNoteWrapper type="button" onClick={addNote}>
        Add note
      </S.CreateNoteWrapper>

      {notes.map((item) => (
        <StickyNote
          key={item.id}
          id={item.id}
          randomColor={item.randomColor}
          position={item.position}
          onClose={() => removeNote(item.id)}
          existingNotes={notes}
          text={item.text}
        />
      ))}
    </div>
  )
}

export default App
