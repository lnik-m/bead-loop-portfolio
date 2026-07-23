interface Props {
  progress: number
  className: string
}

export const ProjectProgress = ({ progress, className }: Props) => {
  return (
    <div className={`w-full h-1.5 bg-support-200 ${className}`}>
      <div
        className={`absolute top-0 left-0 h-1.5 bg-beadLoop-green`}
        style={{
          width: `${progress}%`
        }}
      >
        <div
          className={`text-xs px-1 w-fit rounded-sm
          bg-white text-beadLoop-dark 
          ml-auto mt-[-4px] shadow-md`}
        >
          {progress}%
        </div>
      </div>
    </div>
  )
}
