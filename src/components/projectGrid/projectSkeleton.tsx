export default function Skeleton({ numbers }: any) {
    return (
        <>
        {
            numbers.map((item: number | undefined) => (
                <div key={item} className="w-full p-4 border border-gray-500/[0.1] rounded-[15px]">
                    <div className="animate-pulse md:h-[250px] h-[200px] w-full rounded-[10px] border border-gray-500/[0.1] bg-gray-300/[0.5] dark:bg-gray-300/[0.07] "></div>
                    <div className="animate-pulse h-[15px] w-[70%] rounded-[10px] border border-gray-500/[0.1] bg-gray-300/[0.5] dark:bg-gray-300/[0.07]  my-2"></div>
                    <div className="flex justify-between my-5">
                        <div className="animate-pulse h-[15px] w-[50%] rounded-[10px] border border-gray-500/[0.1] bg-gray-300/[0.5] dark:bg-gray-300/[0.07] "></div>
                        <div className="animate-pulse h-[15px] w-[10%] rounded-[10px] border border-gray-500/[0.1] bg-gray-300/[0.5] dark:bg-gray-300/[0.07] "></div>
                    </div>
                    <div className="animate-pulse h-[10px] w-full rounded-[10px] border border-gray-500/[0.1] bg-gray-300/[0.5] dark:bg-gray-300/[0.07]  my-1"></div>
                    <div className="animate-pulse h-[10px] w-full rounded-[10px] border border-gray-500/[0.1] bg-gray-300/[0.5] dark:bg-gray-300/[0.07]  my-1"></div>
                    <div className="animate-pulse h-[10px] w-full rounded-[10px] border border-gray-500/[0.1] bg-gray-300/[0.5] dark:bg-gray-300/[0.07]  my-1"></div>

                    <div className="flex justify-between my-5">
                        <div className="animate-pulse rounded-[10px] w-[25px] h-[25px] py-0 rounded-full bg-slate-300/[0.5] outline outline-offset-2 outline-gray-500/[0.3]"></div>
                        <div className="animate-pulse h-[10px] w-[10%] rounded-[10px] border border-gray-500/[0.1] bg-gray-300/[0.07]"></div>
                    </div>
                </div>
            ))
        }
        </>
    )
}