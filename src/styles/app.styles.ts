import styled from 'styled-components'

export const TrashWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  left: 0;
  top: 0;
  width: 50px;
  height: 50px;
  background-color: white;
  border-bottom-right-radius: 20px;
  cursor: help;
  transition: transform 0.2s ease-in-out;

  &:hover {
    background-color: #f5f5f5;
    transform: scale(1.1);
  }
`

export const CreateNoteWrapper = styled.button`
  padding: 1rem;
  background-color: blue;
  color: white;
  border-radius: 10px;
  font-size: 1.6rem;
  cursor: pointer;
  border: none;
  user-select: none;
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background-color: hsl(220, 100%, 30%);
  }
`
