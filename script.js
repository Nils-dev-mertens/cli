import si from "systeminformation";
si.cpu()
  .then(data => console.log(data))
  .catch(error => console.error(error));
