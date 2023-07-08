import React from 'react'

import Button from '../button/button.component'

import styles from './empty-list.module.css'

export interface IProps {
  onAddClick?: () => void
  showAddButton?: boolean
}

export const EmptyList = ({ onAddClick, showAddButton }: IProps) => {
  return (
    <div className={styles['container']}>
      <h3>No books found...</h3>
      {showAddButton && <Button onClick={onAddClick}>Add books</Button>}
    </div>
  )
}
