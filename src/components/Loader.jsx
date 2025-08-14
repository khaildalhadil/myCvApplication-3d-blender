import { useProgress } from "@react-three/drei"

export default function Loader() {
  const {progress} = useProgress();
  console.log(progress)
  //style={{
    //   width: `${progress}%`,
    // }}
  return (
    <div className="loader">
      <div className="cup">
        <div className="handle"></div>
        <p className="progress">
          {progress} <span>%</span>
        </p>
      </div>
    </div>
  )
}
