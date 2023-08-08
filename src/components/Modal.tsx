import Modal from '@mui/material/Modal'
import Todo from './Todo'
import { SetStateAction } from 'react'


export default function MyModal({ show, setShow }: Props){

    const handleClose = () => {}
    return(
        <Modal
        open={show}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <>
        <Todo setShow={setShow}/>
        </>
      </Modal>
    )
}

interface Props {
  show: boolean,
  setShow: React.Dispatch<SetStateAction<boolean>>
}