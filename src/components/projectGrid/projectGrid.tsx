function ProjectGrid({ project, id }: any ) {

    return (
        <a href={`/project/?id=${id}`}>
            <div className={`w-[300px] p-4 rounded-[15px] cursor-pointer rounded border border-gray-600/[0.08] bg-white dark:bg-black`}>
                <img src={project.images[0].url} className="w-full h-[200px] rounded-[5px] object-cover border border-gray-600/[0.08]" />
                <h2 className="py-1 font-bold text-[14px]">{project.title}</h2>
                <p className="h-[45px] leading-[20px] overflow-hidden py-2">{project.description}</p>
                <div className="flex justify-between items-center py-2">
                    <p>User</p>
                    <p className="text-[10px] opacity-[0.7]">{project.date}</p>
                </div>
            </div>
        </a>
    )
}

export default ProjectGrid;