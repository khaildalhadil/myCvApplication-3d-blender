import { useProgress } from "@react-three/drei"

export default function Loader() {
  const {progress} = useProgress();
  console.log(progress)
  //style={{
    //   width: `${progress}%`,
    // }}
  return (
    <div className="loading">
      <h1 className="text-gray-50 ">Loadding...</h1>
    </div>
  )
}
