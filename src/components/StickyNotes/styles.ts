import styled, { css } from 'styled-components'

type StickyNoteProps = {
  position: number
}

export const StickyNote = styled.div<StickyNoteProps>`
  ${({ position }) => css`
    min-width: 300px;
    min-height: 200px;
    border: 3px solid #333;
    position: absolute;
    top: ${position}%;
    left: ${position}%;
  `}
`

type StickyNoteHeaderProps = {
  randomColor: string
}

export const StickyNoteHeader = styled.header<StickyNoteHeaderProps>`
  ${({ randomColor }) => css`
    background-color: ${randomColor};
    color: white;
    padding: 1rem;
    cursor: move;

    display: grid;
    grid-template-columns: 1fr auto auto;
    gap: 0.8rem;
  `}
`

export const StickyNoteTitle = styled.h2`
  display: flex;
  align-items: center;
`

export const Textarea = styled.textarea`
  min-width: 300px;
  min-height: 200px;
  width: 100%;
  padding: 1rem;
  border: none;
  font-size: 1.6rem;
`

export const CloseAction = styled.button`
  width: 3.5rem;
  height: 3.5rem;
  background: red;
  border-radius: 50%;
  display: grid;
  place-content: center;
  cursor: pointer;
  border: none;

  &:hover {
    opacity: 0.8;
  }
`

export const BringToFrontAction = styled.button`
  width: 3.5rem;
  height: 3.5rem;
  background: #242424;
  border-radius: 50%;
  display: grid;
  place-content: center;
  cursor: pointer;
  border: none;

  &:hover {
    opacity: 0.8;
  }
`
