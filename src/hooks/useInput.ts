import { ChangeEvent, useState } from "react"

export const useInput = (initialValue: any) => {
    const [value, setValue] = useState(initialValue);

    const onChange = (e: ChangeEvent<any>) => {
        setValue(e.target.value);
    }

    return { value, onChange };
}