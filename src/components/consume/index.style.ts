import styled from 'styled-components'

export const Line = styled.div<{ margin?: string }>`
  display: flex;
  ${(props) => (props?.margin ? `margin: ${props.margin}` : '')}
`

export const LineLabel = styled.div`
  width: 120px;
`

export const LineContent = styled.div``
