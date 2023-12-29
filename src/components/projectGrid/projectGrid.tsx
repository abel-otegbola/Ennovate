function ProjectGrid({ project, id }: any ) {

    return (
        <a href={`/project/?id=${id}`} aria-label={"Project "+ project.title+ " succesfully selected"}>
            <div className={`w-[300px] px-4 pt-4 rounded-[15px] cursor-pointer shadow-lg rounded border border-gray-700/[0.1] bg-white dark:bg-black`}>
                <img src={project.images[0].url} className="w-full h-[200px] rounded-[5px] object-cover border border-gray-600/[0.08]" />
                <h2 className="py-1 font-bold text-[14px]">{project.title}</h2>
                <p className="h-[45px] leading-[20px] overflow-hidden py-2 mb-4">{project.description}</p>
                <div className="flex justify-between items-center text-[10px] py-2 border border-transparent border-t-gray-200/[0.1]">
                    <p className="flex items-center">{project.user}</p>
                    <p className="opacity-[0.7]">{project.date}</p>
                </div>
            </div>
        </a>
    )
}

export default ProjectGrid;