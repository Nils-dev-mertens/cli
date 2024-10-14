import si from "systeminformation";
si.cpu()
  .then(data => console.log(data.brand))
  .catch(error => console.error(error));
si.graphics()
  .then(data => console.log(data.controllers[0].model))
  .catch(error => console.error(error));
 