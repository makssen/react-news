import { useEffect, useState } from "react"

export const useFileReader = () => {
    const [file, setFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);

    useEffect(() => {
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result as string);
            }
            reader.readAsDataURL(file);
        } else {
            setPreview(null);
        }
    }, [file]);

    return { file, setFile, preview, setPreview };
}