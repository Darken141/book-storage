'use client'
import { createPortal } from 'react-dom'
import useLockedBody from '@/hooks/lock-body.hook'

import { motion, Variants } from 'framer-motion'
import { IoClose } from 'react-icons/io5'

import styles from './modal.module.css'

export interface IProps {
  children?: React.ReactNode | React.ReactNode[]
  onClose: () => void
}

export default function Modal({ onClose, children }: IProps) {
  const portal = document.getElementById('portal')!
  const [, setLocked] = useLockedBody(true, 'root')

  const modalVariants: Variants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.5,
      },
    },
  }

  const containerVariants: Variants = {
    hidden: {
      y: '-100%',
      opacity: 0,
    },
    visible: {
      y: '0%',
      opacity: 1,

      transition: {
        ease: [0.12, 0.23, 0, 1.01],
        duration: 1,
      },
    },
  }

  const handleClose = () => {
    setLocked(false)
    onClose()
  }

  return createPortal(
    <motion.div
      variants={modalVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"
      className={styles['modal']}
    >
      <motion.button className={styles['close-button']} onClick={handleClose}>
        Close modal
      </motion.button>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="hidden"
        className={styles['modal-container']}
      >
        <div className={styles['buttons']}>
          <button className={styles['close-icon-button']} onClick={handleClose}>
            <IoClose />
          </button>
        </div>
        {children}
      </motion.div>
    </motion.div>,
    portal
  )
}
