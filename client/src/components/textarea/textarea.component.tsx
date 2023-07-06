import styles from './textarea.module.css'

export interface IProps extends React.InputHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  name: string
  err?: string | undefined
  rows?: number
}
export default function Textarea({ err, ...props }: IProps) {
  return (
    <div className={styles['textarea-container']}>
      {props?.label && (
        <p className={styles['textarea-label']}>{props.label}</p>
      )}
      <textarea
        className={`${styles['textarea']} ${
          err ? styles['textarea-error'] : ''
        }`}
        {...props}
      />
      {err && <p className={styles['textarea-error-message']}>{err}</p>}
    </div>
  )
}
