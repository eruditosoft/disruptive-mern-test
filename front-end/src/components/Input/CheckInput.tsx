import {ChangeEvent} from 'react';
import styles from '@/styles/button.module.css';
export type InputProps = {
    label: string;
    value: string;
    checked: boolean;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}
export default function CheckInput({label, value, checked, onChange}: InputProps) {
    return (
        <label htmlFor={`checkbox-input-${label}`}>
            <input
                id={`checkbox-input-${label}`}
                type="checkbox"
                value={value}
                checked={checked}
                onChange={onChange}
                style={{cursor: 'pointer'}}
            />
            <span className={styles.btn_link} >{label}</span>
        </label>)
}
