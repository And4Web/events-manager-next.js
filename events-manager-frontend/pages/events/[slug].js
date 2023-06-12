import {useRouter} from "next/router";

const Event = () => {
  const router = useRouter();
  return (  
    <div>
      <h1>Event slug: {router.query.slug}</h1>
      <button onClick={()=>router.push("/")}>Go to Home</button>
    </div>
  );
}
export default Event