import { Button } from "@mui/material"
import { MouseEvent } from "react"

type Props = {
  onClick: (event: MouseEvent<HTMLElement>) => void 
}

const MenuButtonHeader = ({ onClick }: Props) => {
  return (
    <Button
      onClick={onClick}
      size="small">
      <span style={{
        fontWeight: '400',
        fontSize: '1.5rem',
      }}>
        ···
      </span>
    </Button>
  )
}


export default MenuButtonHeader;