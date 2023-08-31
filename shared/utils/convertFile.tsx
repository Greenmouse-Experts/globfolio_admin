import {useState} from 'react'
export const CovertToBase64 = (file:any) => {
    const [convert, setConvert] = useState(file)
        const reader = new FileReader();
        reader.onload = () => {
          const base64 = reader.result;
          setConvert(base64)
        }
    return convert
}