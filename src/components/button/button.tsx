interface buttonProps {
    text: string,
    link: string
}

function Button({ text, link }: buttonProps) {
    const outerStyle: string = "p-[1px] rounded bg-gradient-to-r from-purple to-green w-fit"
    const innerStyle: string = "flex items-center w-fit px-6 py-[8px] bg-white dark:bg-black rounded hover:bg-gradient-to-r hover:from-purple hover:to-green"
    
    return (
        <div className={outerStyle}>
            <a href={link} className={innerStyle}>
                <span>{text}</span>
            </a>
        </div>
    )
}

export default Button;