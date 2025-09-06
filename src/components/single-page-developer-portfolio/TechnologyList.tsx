type TProps = {
    technologies: string[];
    maxVisible: number;
}

export const TechnologyList = (props: TProps) => {
    const { technologies, maxVisible } = props;
    const visibleTechs = technologies.slice(0, maxVisible);
    const hiddenTechs = technologies.slice(maxVisible);
    const hasMore = technologies.length > maxVisible;

    return (
        <div className="flex flex-wrap gap-2 items-center">
            {visibleTechs.map((tech, index) => (
                <span
                    key={tech + index}
                    className="text-[#D9D9D9] font-[500] text-[1.125rem]"
                >
                    {tech}
                </span>
            ))}
            {hasMore && (
                <div className="relative group">
                    <span className="text-[#4EE1A0] font-[500] text-[1.125rem] cursor-help">
                        +{hiddenTechs.length} more
                    </span>
                    {/* Tooltip */}
                    <div className="absolute top-8 left-0 mb-2 px-3 py-2 bg-[#242424] border border-[#4EE1A0] rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-10 min-w-[18rem]">
                        <div className="flex gap-2 flex-wrap">
                            {hiddenTechs.map((tech, index) => (
                                <span
                                    key={tech + index}
                                    className="text-[#D9D9D9] font-[500] text-[0.875rem]"
                                >
                                    {tech}
                                </span>
                            ))}
                        </div>
                        {/* Arrow */}
                        {/* <div className="absolute top-full left-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-[#4EE1A0]"></div> */}
                    </div>
                </div>
            )}
        </div>
    );
};