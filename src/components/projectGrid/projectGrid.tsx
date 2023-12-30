

function ProjectGrid({ project, id }: any ) {

    return (
        <a href={`/project/?id=${id}`} className="sm:w-[300px] w-full" aria-label={"Project "+ project.title+ " succesfully selected"}>
            <div className={`w-full px-4 pt-4 rounded-[15px] cursor-pointer rounded shadow-sm border border-gray-200 dark:border-gray-300/[0.2] bg-white dark:bg-black`}>
                <img src={project.images[0].url} className="w-full h-[200px] rounded-[5px] object-cover border border-gray-600/[0.08]" />
                <h2 className="py-1 font-bold text-[14px]">{project.title}</h2>
                <p className="h-[65px] text-[12px] leading-[20px] overflow-hidden py-2 mb-4">{project.description}</p>
                <div className="flex justify-between items-center text-[11px] py-2 border border-transparent border-t-gray-200/[0.1]">
                    <p className="flex items-center"></p>
                    <p className="opacity-[0.7]">{project.date}</p>
                </div>
            </div>
        </a>
    )
}

export default ProjectGrid;