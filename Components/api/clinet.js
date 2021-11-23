import create from "apisauce";
const apiClinet = create({
  baseURL: "http://213.42.107.146:1372/MobilesBackEnd_war_exploded",
});
// apiClinet.get("/listings").then((response) => {
//   if (!response.ok) {
//     response.problem;
//   }
// });
export default apiClinet;
