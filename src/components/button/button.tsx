interface buttonProps {
    text: string,
    icon: any,
    link: string
}

function Button({ text, icon, link }: buttonProps) {
    const outerStyle: string = "p-[1px] rounded-[30px] bg-gradient-to-r from-purple to-green w-fit"
    const innerStyle: string = "flex items-center w-fit px-6 py-[10px] bg-black rounded-full hover:bg-gradient-to-r hover:from-purple hover:to-green"
    
    return (
        <div className={outerStyle}>
            <a href={link} className={innerStyle}>
                <span className="mr-2">{icon}</span>
                <span>{text}</span>
            </a>
        </div>
    )
}

export default Button;