import styles from './input.module.css'

export interface IProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  name: string
  err?: string | undefined
}
export default function Input({ err, ...props }: IProps) {
  return (
    <div className={styles['input-container']}>
      {props?.label && <p className={styles['input-label']}>{props.label}</p>}
      <input
        className={`${styles['input']} ${err ? styles['input-error'] : ''}`}
        {...props}
      />
      {err && <p className={styles['input-error-message']}>{err}</p>}
    </div>
  )
}
