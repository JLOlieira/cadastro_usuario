function Input({type, name, placeholder, value, onchange, ...rest}, ref) {
    return(
        <input type={type} name={name} placeholder={placeholder} value={value} onChange={onchange} ref={ref} {...rest} />
    )
}

export default Input;