interface buttonProps {
    text: string,
    link: string
}

function Button({ text, link }: buttonProps) {
    const innerStyle: string = "px-8 py-[10px] bg-[#5938DD] rounded hover:bg-[#000] text-white"
    
    return (
        <a href={link} className={innerStyle}>
            <span>{text}</span>
        </a>
    )
}

export default Button;