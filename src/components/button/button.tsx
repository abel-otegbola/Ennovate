interface buttonProps {
    text: string,
    link: string,
}

function Button({ text, link }: buttonProps) {
    const innerStyle: string = `px-8 py-[13px] rounded bg-purple hover:bg-purple/[0.8] text-white`
    
    return (
        <button>
            <a href={link} className={innerStyle}>
                <span>{text}</span>
            </a>
        </button>
    )
}

export default Button;