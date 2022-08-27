import styled, { css } from 'styled-components'

const subColor = 'gray'
const mainColor = 'rgb(45, 172, 45)'

const shrinkLabelStyles = css`
  top: 0px;
  font-size: 12px;
  color: ${mainColor};
  outline: none;
`

const shrinkLabelTextareaStyles = css`
  top: 10px;
  font-size: 12px;
  color: ${mainColor};
  outline: none;
`

export const FormInputLabel = styled.label`
  color: ${subColor};
  font-size: 16px;
  font-weight: 500;
  position: absolute;
  pointer-events: none;
  left: 5px;
  top: 23px;
  transition: 300ms ease all;
  ${({ shrink }) => shrink && shrinkLabelStyles}
`


export const Input = styled.input`
background: none;
  background-color: white;
  color: ${subColor};
  font-size: 17px;
  padding: 10px 10px 0px 5px;
  display: block;
  border: none;
  width: 100%;
  height: 50px;
  outline: none;
  border-radius: 0;
  border-bottom: 2px solid ${subColor};

  // &:focus {
  //   outline: none;
  //   border-bottom: 2px solid rgb(45, 172, 45);
  // }

  &:focus ~ ${FormInputLabel} {
    ${shrinkLabelStyles}
  }
`

export const TextareaLabel = styled.label`
  color: ${subColor};
  font-size: 16px;
  font-weight: 500;
  position: absolute;
  pointer-events: none;
  left: 5px;
  top: 32px;
  transition: 300ms ease all;
  ${({ shrink }) => shrink && shrinkLabelTextareaStyles}
`

export const Textarea = styled.textarea`
  background: none;
  background-color: white;
  color: ${subColor};
  font-size: 18px;
  padding: 18px 10px 0px 5px;
  display: block;
  height: 80px;
  width: 100%;
  resize: vertical;
  border: none;
  border-radius: 0;
  border-bottom: 2px solid ${subColor};
  margin: 10px 0 10px 0;
  outline: none;

  &:focus ~ ${TextareaLabel} {
    ${shrinkLabelTextareaStyles}
  }
  `

export const Group = styled.div`
  position: relative;
  width: 100%;
  margin: 10px 0 0 0;
`