import { Button } from '@mui/material'

const ButtonComponent = ({ variant, text, sx, color, onClick, show }) => {
  return (
    <>
      {show && (
        <Button
          variant={variant}
          sx={sx}
          color={color}
          onClick={onClick}
        >
          {text}
        </Button>
      )}
    </>
  )
}

export default ButtonComponent
