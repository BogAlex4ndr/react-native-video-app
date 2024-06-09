export type FormFieldProps = {
    title: string,
    value: string,
    extraStyle: string,
    handleChangeValue: (e: string) => void,
    keyboardType?: string,
    placeholder: string,
}