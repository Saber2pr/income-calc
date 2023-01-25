import styled, { css } from 'styled-components'

export const Contain = styled.div<{ isMob: boolean }>`
  ${(props) =>
    props.isMob
      ? css``
      : css`
          display: flex;
        `}
`
export const Content = styled.div<{ isMob: boolean }>`
  ${(props) =>
    props.isMob
      ? css``
      : css`
          width: 50%;
        `}
`
export const Aside = styled.div`
  width: 50%;
`

export const Background = styled.div`
  background-color: #fff;
  padding-top: 8px;
`

export const Charts = styled.div`
  height: 100vh;
  overflow-y: auto;
`
