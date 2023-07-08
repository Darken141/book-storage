'use client'

import { motion, HTMLMotionProps } from 'framer-motion'

import styles from './button.module.css'

export interface IProps extends HTMLMotionProps<'button'> {}

export default function Button({ children, ...props }: IProps) {
  return (
    <motion.button
      {...props}
      className={`${styles['button']} ${props.className}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {children}
    </motion.button>
  )
}
